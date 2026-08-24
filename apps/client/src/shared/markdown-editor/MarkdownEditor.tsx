/**
 * 블록 구조와 React를 잇는 레이어. 선택·범위 조작은 selection.ts가 맡는다.
 *
 * React로 제어하면 매 글자마다 노드가 교체돼 커서가 튀고 한글 조합이 깨지기 때문에
 * 편집 영역 안의 노드는 이 파일에서만 다룬다.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';

import type { Block, BlockType, MarkdownCommand } from './commands';
import {
  BLOCK_ATTRIBUTE,
  blocksToHtml,
  DEFAULT_BLOCK_TYPE,
  getNextBlockType,
  INLINE_TAGS,
  isBlockType,
  isStandaloneBlock,
  MARKDOWN_COMMANDS,
  matchInputRule,
  parseMarkdown,
  serializeBlocks,
  wrapInline,
} from './commands';
import {
  expandToWord,
  getSelectionRange,
  getTextAfterCaret,
  getTextBeforeCaret,
  placeCaretAtStart,
  toggleFormat,
} from './selection';

type MarkdownEditorOptions = {
  value: string;
  onChange: (value: string) => void;
};

type MarkdownEditorApi = {
  ref: RefObject<HTMLDivElement | null>;
  commands: readonly MarkdownCommand[];
  activeType: BlockType;
  setBlockType: (type: BlockType) => void;
  getInputProps: () => InputBindings;
};

type InputBindings = {
  ref: RefObject<HTMLDivElement | null>;
  contentEditable: true;
  suppressContentEditableWarning: true;
  role: 'textbox';
  'aria-multiline': true;
  onInput: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
  onBlur: () => void;
  onKeyUp: () => void;
  onMouseUp: () => void;
};

const IS_APPLE =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

/** 삭제 계열 inputType은 전부 이 접두사로 시작한다 (Input Events Level 2) */
const DELETE_INPUT_TYPE_PREFIX = 'delete';

/** 블록 자리에 나타나도 줄이 아니라 본문 조각으로 취급할 태그. */
const INLINE_LIKE_TAGS: ReadonlySet<string> = new Set([
  ...Object.keys(INLINE_TAGS).map((tag) => tag.toUpperCase()),
  'SPAN',
  'A',
  'BR',
]);

/** Cmd/Ctrl + 키 → 감쌀 인라인 태그 */
const INLINE_SHORTCUTS: Readonly<Record<string, string>> = {
  b: 'strong',
  i: 'em',
};

/* -------------------------------------------------------------------------- */
/* DOM → 마크다운                                                              */
/* -------------------------------------------------------------------------- */

const serializeChildren = (node: Node): string => {
  const children = Array.from(node.childNodes);
  let text = '';

  children.forEach((child, index) => {
    // 빈 블록을 채우는 마지막 <br>은 내용이 아니라 자리 표시자다.
    const isFiller = child.nodeName === 'BR' && index === children.length - 1;
    if (isFiller) {
      return;
    }
    text += serializeNode(child);
  });

  return text;
};

const serializeNode = (node: Node): string => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? '';
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const element = node as Element;
  if (element.tagName === 'BR') {
    return '\n';
  }

  const inner = serializeChildren(element);
  const marker = INLINE_TAGS[element.tagName.toLowerCase()];

  // 빈 서식 태그는 마커만 남기지 않고 통째로 버린다 (`****` 방지).
  if (marker === undefined) {
    return inner;
  }

  return wrapInline(marker, inner);
};

const readBlockType = (element: Element): BlockType => {
  const attribute = element.getAttribute(BLOCK_ATTRIBUTE);

  return isBlockType(attribute) ? attribute : DEFAULT_BLOCK_TYPE;
};

const readBlocks = (container: HTMLElement): Block[] => {
  const blocks: Block[] = [];

  for (const child of Array.from(container.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      // 조합(IME) 중에는 normalizeBlocks를 건너뛰어 감싸이지 않은 텍스트가 남는다.
      const text = child.textContent ?? '';
      if (text.trim().length > 0) {
        blocks.push({ type: DEFAULT_BLOCK_TYPE, text });
      }
      continue;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    const element = child as HTMLElement;
    const type = readBlockType(element);
    blocks.push({
      type,
      text: isStandaloneBlock(type) ? '' : serializeChildren(element),
    });
  }

  return blocks.length > 0 ? blocks : [{ type: DEFAULT_BLOCK_TYPE, text: '' }];
};

/* -------------------------------------------------------------------------- */
/* 커서 · 블록 조작                                                             */
/* -------------------------------------------------------------------------- */

const createBlockElement = (block: Block): HTMLElement | null => {
  const template = document.createElement('div');
  template.innerHTML = blocksToHtml([block]);

  return template.firstElementChild as HTMLElement | null;
};

/** 선택이 걸쳐 있는 최상위 블록 엘리먼트 */
const getBlockElement = (
  container: HTMLElement,
  node: Node | null,
): HTMLElement | null => {
  let current = node;

  while (current !== null && current !== container) {
    if (current.parentNode === container) {
      return current.nodeType === Node.ELEMENT_NODE
        ? (current as HTMLElement)
        : null;
    }
    current = current.parentNode;
  }

  return null;
};

/**
 * Cmd+B 같은 서식 토글. 한 블록 안의 선택일 때만 적용한다.
 *
 * 폐기된 `execCommand`는 브라우저마다 다른 마크업을 만들어(<b>, <span style>)
 * INLINE_TAGS에 없는 태그가 섞이면 직렬화에서 서식이 사라진다.
 */
const toggleInline = (container: HTMLElement, tagName: string): boolean => {
  const range = getSelectionRange(container);
  if (range === null) {
    return false;
  }
  // 커서만 있으면 감쌀 글자가 없으므로 커서가 놓인 단어를 대상으로 삼는다.
  if (range.collapsed && !expandToWord(range)) {
    return false;
  }

  // 블록을 넘어선 선택을 감싸면 <strong> 안에 <p>가 들어간다.
  const block = getBlockElement(container, range.startContainer);
  if (
    block === null ||
    block !== getBlockElement(container, range.endContainer)
  ) {
    return false;
  }

  toggleFormat(block, range, tagName);

  return true;
};

/** 빈 블록에 커서를 둘 수 있도록 <br>을 넣는다. 길이 0인 텍스트 노드는 커서를 못 받는다. */
const fillIfEmpty = (element: HTMLElement): void => {
  for (const child of Array.from(element.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE && child.textContent === '') {
      child.remove();
    }
  }

  if (element.childNodes.length === 0) {
    element.appendChild(document.createElement('br'));
  }
};

/** 블록의 종류를 바꾼다. 자식을 옮기는 방식이라 인라인 서식은 살아남는다. */
const convertBlock = (
  block: HTMLElement,
  type: BlockType,
): HTMLElement | null => {
  const replacement = createBlockElement({ type, text: '' });
  if (replacement === null) {
    return null;
  }

  if (!isStandaloneBlock(type)) {
    replacement.replaceChildren();
    while (block.firstChild !== null) {
      replacement.appendChild(block.firstChild);
    }
    fillIfEmpty(replacement);
  }

  block.replaceWith(replacement);

  return replacement;
};

const isBlockElement = (node: Node): boolean =>
  node.nodeType === Node.ELEMENT_NODE &&
  (node as Element).hasAttribute(BLOCK_ATTRIBUTE);

const isInlineLike = (node: Node): boolean =>
  node.nodeType !== Node.ELEMENT_NODE ||
  INLINE_LIKE_TAGS.has((node as Element).tagName);

/**
 * 브라우저가 깨뜨린 구조를 "최상위 자식은 항상 블록 엘리먼트"로 되돌린다.
 * 입력 규칙도 Enter도 직렬화도 전부 이 전제 위에 있다.
 */
const normalizeBlocks = (container: HTMLElement): void => {
  let fragments: ChildNode[] = [];

  const wrapFragments = () => {
    if (fragments.length === 0) {
      return;
    }

    const paragraph = createBlockElement({
      type: DEFAULT_BLOCK_TYPE,
      text: '',
    });
    if (paragraph !== null) {
      paragraph.replaceChildren();
      fragments[0].before(paragraph);
      for (const fragment of fragments) {
        paragraph.appendChild(fragment);
      }
      fillIfEmpty(paragraph);
    }
    fragments = [];
  };

  for (const child of Array.from(container.childNodes)) {
    if (isBlockElement(child)) {
      wrapFragments();
      continue;
    }
    if (isInlineLike(child)) {
      fragments.push(child);
      continue;
    }

    // 블록 자리에 놓인 엘리먼트는 줄 하나다. 자식을 그대로 살려 본문으로 바꾼다.
    wrapFragments();
    convertBlock(child as HTMLElement, DEFAULT_BLOCK_TYPE);
  }
  wrapFragments();

  if (container.childNodes.length > 0) {
    return;
  }

  // 블록이 하나도 남지 않았다. 커서를 둘 자리를 만든다.
  const paragraph = createBlockElement({ type: DEFAULT_BLOCK_TYPE, text: '' });
  if (paragraph === null) {
    return;
  }

  container.appendChild(paragraph);
  // 포커스가 없을 때 선택을 옮기면 사용자가 보던 다른 선택을 빼앗는다.
  if (document.activeElement === container) {
    placeCaretAtStart(paragraph);
  }
};

/**
 * 삭제로 비워진 블록을 기본 블록으로 되돌린다. 브라우저가 첫 블록을 껍데기로
 * 남기는 탓에 "다 지웠는데 첫 줄이 계속 제목"인 상태가 되는 걸 막는다.
 */
const resetEmptiedBlocks = (
  container: HTMLElement,
  blocks: HTMLElement[],
): void => {
  const range = getSelectionRange(container);

  for (const block of blocks) {
    // 통째로 지워진 블록은 되돌릴 것이 없다.
    if (!container.contains(block)) {
      continue;
    }

    const type = readBlockType(block);
    // 구분선은 원래 본문이 없어서 "비었다"로 판단할 수 없다.
    if (type === DEFAULT_BLOCK_TYPE || isStandaloneBlock(type)) {
      continue;
    }
    if ((block.textContent ?? '').length > 0) {
      continue;
    }

    // 엘리먼트를 갈아끼우면 선택이 사라지므로 미리 확인해 둔다.
    const hasCaret = range !== null && block.contains(range.startContainer);
    const converted = convertBlock(block, DEFAULT_BLOCK_TYPE);
    if (converted !== null && hasCaret) {
      placeCaretAtStart(converted);
    }
  }
};

/* -------------------------------------------------------------------------- */
/* hook                                                                        */
/* -------------------------------------------------------------------------- */

export function useMarkdownEditor({
  value,
  onChange,
}: MarkdownEditorOptions): MarkdownEditorApi {
  const ref = useRef<HTMLDivElement>(null);
  /** 우리가 마지막으로 내보낸 마크다운. 바깥 변경과 자기 변경을 구별한다. */
  const lastMarkdownRef = useRef<string | null>(null);
  /** 브라우저가 지우기 직전에 선택이 걸쳐 있던 블록들. 삭제 후 종류를 정리한다. */
  const deletionTargetsRef = useRef<HTMLElement[]>([]);
  /** 한글 등 조합 입력이 진행 중인지. 조합 중에는 DOM 구조를 건드리지 않는다. */
  const isComposingRef = useRef(false);

  const [activeType, setActiveType] = useState<BlockType>(DEFAULT_BLOCK_TYPE);

  const syncActiveType = useCallback(() => {
    const container = ref.current;
    if (container === null) {
      return;
    }

    const range = getSelectionRange(container);
    const block =
      range === null ? null : getBlockElement(container, range.startContainer);

    setActiveType(block === null ? DEFAULT_BLOCK_TYPE : readBlockType(block));
  }, []);

  /** DOM을 읽어 마크다운으로 만들고 바깥에 알린다. */
  const publish = useCallback(() => {
    const container = ref.current;
    if (container === null) {
      return;
    }

    // 조합 중인 노드를 옮기면 IME가 끊긴다.
    if (!isComposingRef.current) {
      // 삭제 직후라면 비워진 블록의 종류부터 정리한다.
      if (deletionTargetsRef.current.length > 0) {
        resetEmptiedBlocks(container, deletionTargetsRef.current);
        deletionTargetsRef.current = [];
      }
      normalizeBlocks(container);
    }

    const markdown = serializeBlocks(readBlocks(container));
    lastMarkdownRef.current = markdown;
    container.setAttribute(
      'data-empty',
      markdown.length === 0 ? 'true' : 'false',
    );

    onChange(markdown);
    syncActiveType();
  }, [onChange, syncActiveType]);

  // 바깥에서 들어온 value가 우리가 내보낸 것과 다를 때만 다시 그린다.
  useLayoutEffect(() => {
    const container = ref.current;
    if (container === null || value === lastMarkdownRef.current) {
      return;
    }

    lastMarkdownRef.current = value;
    container.innerHTML = blocksToHtml(parseMarkdown(value));
    container.setAttribute('data-empty', value.length === 0 ? 'true' : 'false');
  }, [value]);

  // 삭제 전에만 "어떤 블록이 걸려 있었는지" 알 수 있다. React의 onBeforeInput은
  // inputType을 주지 않아 네이티브 이벤트를 직접 듣는다.
  useEffect(() => {
    const container = ref.current;
    if (container === null) {
      return;
    }

    const rememberDeletionTargets = (event: InputEvent) => {
      if (!event.inputType.startsWith(DELETE_INPUT_TYPE_PREFIX)) {
        return;
      }

      const range = getSelectionRange(container);
      // 캐럿만 있는 삭제는 한 글자를 지울 뿐이라 블록이 비지 않는다.
      if (range === null || range.collapsed) {
        return;
      }

      // 전체 선택도 놓치지 않도록 걸쳐 있는 블록을 전부 기록한다.
      deletionTargetsRef.current = Array.from(container.children).filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement && range.intersectsNode(child),
      );
    };

    container.addEventListener('beforeinput', rememberDeletionTargets);

    return () => {
      container.removeEventListener('beforeinput', rememberDeletionTargets);
    };
  }, []);

  const setBlockType = useCallback(
    (type: BlockType) => {
      const container = ref.current;
      if (container === null) {
        return;
      }

      container.focus();
      const range = getSelectionRange(container);
      const block =
        range === null
          ? null
          : getBlockElement(container, range.startContainer);
      if (block === null) {
        return;
      }

      const next = readBlockType(block) === type ? DEFAULT_BLOCK_TYPE : type;
      const converted = convertBlock(block, next);
      if (converted !== null) {
        placeCaretAtStart(converted);
      }
      publish();
    },
    [publish],
  );

  /**
   * 줄 앞에서 문법을 친 순간 블록을 바꾼다. `# `은 공백을 눌러야 확정되지만,
   * 구분선은 마커가 곧 확정이라 아직 넣지 않은 글자를 `pendingKey`로 받아 판정한다.
   */
  const applyInputRule = useCallback(
    (container: HTMLElement, pendingKey = ''): boolean => {
      const range = getSelectionRange(container);
      if (range === null || !range.collapsed) {
        return false;
      }

      const block = getBlockElement(container, range.startContainer);
      if (block === null) {
        return false;
      }

      const typed = getTextBeforeCaret(block, range) + pendingKey;
      const type = matchInputRule(typed);
      if (type === null) {
        return false;
      }

      // 공백을 기다리지 않고 앞당겨 판정할 수 있는 건 본문 없는 블록뿐이다.
      if (pendingKey !== '' && !isStandaloneBlock(type)) {
        return false;
      }

      // 캐럿 뒤에 글자가 남아 있으면 구분선이 될 수 없다. 마커를 지운 뒤에는
      // 되돌릴 수 없으므로 DOM을 건드리기 전에 판단한다.
      if (
        isStandaloneBlock(type) &&
        getTextAfterCaret(block, range).length > 0
      ) {
        return false;
      }

      // 이미 같은 종류인 줄에서 또 마커를 쳤다면 바꿀 건 없지만 마커는 먹어치운다.
      // 그냥 두면 `- 항목 둘`처럼 마커가 글자로 남는다.
      const isSameType = type === readBlockType(block);

      // 방금 친 마커를 지운다. 남겨두면 화면에 `# `이 그대로 보인다.
      const markerRange = document.createRange();
      markerRange.selectNodeContents(block);
      markerRange.setEnd(range.startContainer, range.startOffset);
      markerRange.deleteContents();

      if (isSameType) {
        fillIfEmpty(block);
        placeCaretAtStart(block);
        publish();

        return true;
      }

      if (isStandaloneBlock(type)) {
        const divider = createBlockElement({ type, text: '' });
        const paragraph = createBlockElement({
          type: DEFAULT_BLOCK_TYPE,
          text: '',
        });
        if (divider === null || paragraph === null) {
          return false;
        }

        block.replaceWith(divider);
        divider.after(paragraph);
        placeCaretAtStart(paragraph);
        publish();

        return true;
      }

      const converted = convertBlock(block, type);
      if (converted === null) {
        return false;
      }

      placeCaretAtStart(converted);
      publish();

      return true;
    },
    [publish],
  );

  /** Enter: 커서 위치에서 블록을 쪼갠다. 제목 다음 줄은 본문이 된다. */
  const splitBlock = useCallback(
    (container: HTMLElement): boolean => {
      const range = getSelectionRange(container);
      if (range === null) {
        return false;
      }

      const block = getBlockElement(container, range.startContainer);
      if (block === null) {
        return false;
      }

      const type = readBlockType(block);

      // 빈 목록/인용 줄에서 Enter → 서식을 벗고 본문으로 빠져나온다.
      if (
        type !== DEFAULT_BLOCK_TYPE &&
        range.collapsed &&
        (block.textContent ?? '').length === 0
      ) {
        const converted = convertBlock(block, DEFAULT_BLOCK_TYPE);
        if (converted !== null) {
          placeCaretAtStart(converted);
        }
        publish();

        return true;
      }

      range.deleteContents();

      const tail = range.cloneRange();
      tail.selectNodeContents(block);
      tail.setStart(range.endContainer, range.endOffset);
      const tailContent = tail.extractContents();

      const next = createBlockElement({
        type: getNextBlockType(type),
        text: '',
      });
      if (next === null) {
        return false;
      }

      next.replaceChildren(tailContent);
      fillIfEmpty(next);
      fillIfEmpty(block);
      block.after(next);
      placeCaretAtStart(next);
      publish();

      return true;
    },
    [publish],
  );

  /**
   * Backspace: 줄 맨 앞에서 누르면 서식만 벗긴다. 앞 줄과의 병합은 브라우저에
   * 맡기는데, 이 동작은 브라우저마다 결과가 달라 확인이 필요한 지점이다.
   */
  const clearBlockType = useCallback(
    (container: HTMLElement): boolean => {
      const range = getSelectionRange(container);
      if (range === null || !range.collapsed) {
        return false;
      }

      const block = getBlockElement(container, range.startContainer);
      if (block === null || readBlockType(block) === DEFAULT_BLOCK_TYPE) {
        return false;
      }
      if (getTextBeforeCaret(block, range).length > 0) {
        return false;
      }

      const converted = convertBlock(block, DEFAULT_BLOCK_TYPE);
      if (converted !== null) {
        placeCaretAtStart(converted);
      }
      publish();

      return true;
    },
    [publish],
  );

  const getInputProps = useCallback(
    (): InputBindings => ({
      ref,
      contentEditable: true,
      suppressContentEditableWarning: true,
      role: 'textbox',
      'aria-multiline': true,
      // 조합 중에도 내보낸다. 거르면 조합이 끝나기 전에 저장할 때 마지막 글자가 빠진다.
      onInput: publish,
      onCompositionStart: () => {
        isComposingRef.current = true;
      },
      // 조합이 확정되는 순간 한 번 더 맞춘다.
      onCompositionEnd: () => {
        isComposingRef.current = false;
        publish();
      },
      onBlur: publish,
      onKeyDown: (event) => {
        const container = ref.current;
        if (container === null || event.nativeEvent.isComposing) {
          return;
        }

        if (event.key === ' ' && applyInputRule(container)) {
          event.preventDefault();

          return;
        }

        // `---`의 세 번째 하이픈처럼 마커만으로 완성되는 문법은 글자를 넣기 전에 잡는다.
        const isTypingCharacter =
          event.key.length === 1 &&
          event.key !== ' ' &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.altKey;
        if (isTypingCharacter && applyInputRule(container, event.key)) {
          event.preventDefault();

          return;
        }

        if (event.key === 'Enter' && !event.shiftKey) {
          if (splitBlock(container)) {
            event.preventDefault();
          }

          return;
        }

        if (event.key === 'Backspace' && clearBlockType(container)) {
          event.preventDefault();

          return;
        }

        const isModifierPressed = IS_APPLE ? event.metaKey : event.ctrlKey;
        const tagName = INLINE_SHORTCUTS[event.key.toLowerCase()];
        if (isModifierPressed && !event.altKey && tagName !== undefined) {
          // 할 일이 없어도 막는다. 네이티브 서식이 <span style>를 남기면
          // 직렬화에서 서식이 사라진다.
          event.preventDefault();
          if (toggleInline(container, tagName)) {
            publish();
          }
        }
      },
      onKeyUp: syncActiveType,
      onMouseUp: syncActiveType,
    }),
    [applyInputRule, clearBlockType, publish, splitBlock, syncActiveType],
  );

  return {
    ref,
    commands: MARKDOWN_COMMANDS,
    activeType,
    setBlockType,
    getInputProps,
  };
}

/* -------------------------------------------------------------------------- */
/* 합성 컴포넌트                                                                */
/* -------------------------------------------------------------------------- */

const MarkdownEditorContext = createContext<MarkdownEditorApi | null>(null);

const useMarkdownEditorContext = (component: string): MarkdownEditorApi => {
  const context = useContext(MarkdownEditorContext);
  if (context === null) {
    throw new Error(
      `<MarkdownEditor.${component}>는 <MarkdownEditor> 안에서만 사용할 수 있습니다.`,
    );
  }

  return context;
};

type RootProps = MarkdownEditorOptions & { children?: ReactNode };

const Root = ({ children, ...options }: RootProps) => {
  const api = useMarkdownEditor(options);

  return (
    <MarkdownEditorContext.Provider value={api}>
      {children}
    </MarkdownEditorContext.Provider>
  );
};

type ToolbarProps = {
  className?: string;
  /** 함수를 주면 지원하는 블록 문법마다 한 번씩 호출한다. */
  children?: ReactNode | ((command: MarkdownCommand) => ReactNode);
};

const Toolbar = ({ className, children }: ToolbarProps) => {
  const { commands } = useMarkdownEditorContext('Toolbar');
  const content =
    typeof children === 'function'
      ? commands.map((command) => children(command))
      : children;

  return (
    <div role="toolbar" className={className}>
      {content}
    </div>
  );
};

type ButtonProps = {
  command: MarkdownCommand;
  className?: string;
  children?: ReactNode;
  /** 블록을 바꾸는 일은 버튼이 하고, 그 다음 할 일은 쓰는 쪽이 정한다. */
  onSelect?: (command: MarkdownCommand) => void;
};

const Button = ({ command, className, children, onSelect }: ButtonProps) => {
  const { activeType, setBlockType } = useMarkdownEditorContext('Button');

  const preserveCaret = (event: MouseEvent<HTMLButtonElement>) => {
    // 이걸 빼면 포커스가 편집 영역 밖으로 나가 커서 위치가 날아간다.
    event.preventDefault();
  };

  const selectCommand = () => {
    setBlockType(command.id);
    onSelect?.(command);
  };

  return (
    <button
      type="button"
      className={className}
      aria-label={command.label}
      aria-pressed={activeType === command.id}
      onMouseDown={preserveCaret}
      onClick={selectCommand}
    >
      {children ?? command.label}
    </button>
  );
};

type InputProps = {
  /** 편집 영역은 자기 스타일을 갖지 않는다. 블록별 스타일은 쓰는 쪽이 정한다. */
  className?: string;
  /** 내용이 비었을 때 보여줄 안내 문구 */
  placeholder?: string;
};

const Input = ({ className, placeholder }: InputProps) => {
  const { getInputProps } = useMarkdownEditorContext('Input');

  return (
    <div
      {...getInputProps()}
      className={className}
      data-placeholder={placeholder}
    />
  );
};

export const MarkdownEditor = Object.assign(Root, { Toolbar, Button, Input });
