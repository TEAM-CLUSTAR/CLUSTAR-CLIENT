/**
 * 편집 동작을 모아 둔 훅. 입력·키보드·조합(IME)을 받아 마크다운으로 내보낸다.
 *
 * 타이핑 중에는 React가 편집 영역의 DOM에 손대지 않는다. 제어하려 들면 매 글자마다
 * 노드가 교체돼 커서가 튀고 한글 조합이 깨지기 때문이다. 바깥에서 들어온 value가
 * 우리가 마지막으로 내보낸 마크다운과 다를 때만 다시 그린다.
 */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent, RefObject } from 'react';

import {
  convertBlock,
  fillIfEmpty,
  getBlockElement,
  markEmptiness,
  normalizeBlocks,
  readBlockType,
  readMarkdown,
  renderMarkdown,
  replaceWithStandalone,
  resetEmptiedBlocks,
  splitBlockAt,
  toggleInline,
} from './blocks';
import type { BlockType, InlineTag, MarkdownCommand } from './markdown';
import {
  DEFAULT_BLOCK_TYPE,
  getNextBlockType,
  isStandaloneBlock,
  MARKDOWN_COMMANDS,
  matchInputRule,
} from './markdown';
import {
  deleteBeforeCaret,
  getSelectionRange,
  getTextAfterCaret,
  getTextBeforeCaret,
  placeCaretAtStart,
} from './selection';

export type MarkdownEditorOptions = {
  value: string;
  onChange: (value: string) => void;
};

export type MarkdownEditorApi = {
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

/** Cmd/Ctrl + 키 → 감쌀 인라인 태그 */
const INLINE_SHORTCUTS: Readonly<Record<string, InlineTag>> = {
  b: 'strong',
  i: 'em',
};

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

    const markdown = readMarkdown(container);
    lastMarkdownRef.current = markdown;
    markEmptiness(container, markdown);

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
    renderMarkdown(container, value);
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
      deleteBeforeCaret(block, range);

      if (isSameType) {
        fillIfEmpty(block);
        placeCaretAtStart(block);
        publish();

        return true;
      }

      if (isStandaloneBlock(type)) {
        const paragraph = replaceWithStandalone(block, type);
        if (paragraph === null) {
          return false;
        }

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

      const next = splitBlockAt(block, range, getNextBlockType(type));
      if (next === null) {
        return false;
      }

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
