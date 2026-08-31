/**
 * 편집 동작을 모아 둔 훅. 입력·키보드·조합(IME)을 받아 마크다운으로 내보낸다.
 * 타이핑 중에는 React가 편집 영역의 DOM에 손대지 않는다.
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

const INLINE_SHORTCUTS: Readonly<Record<string, InlineTag>> = {
  b: 'strong',
  i: 'em',
};

export function useMarkdownEditor({
  value,
  onChange,
}: MarkdownEditorOptions): MarkdownEditorApi {
  const ref = useRef<HTMLDivElement>(null);
  /** 우리가 마지막으로 내보낸 마크다운. */
  const lastMarkdownRef = useRef<string | null>(null);
  /** 브라우저가 지우기 직전에 선택이 걸쳐 있던 블록들. */
  const deletionTargetsRef = useRef<HTMLElement[]>([]);
  /** 한글 등 조합 입력이 진행 중인지. */
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

  const publish = useCallback(() => {
    const container = ref.current;
    if (container === null) {
      return;
    }

    if (!isComposingRef.current) {
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

  useLayoutEffect(() => {
    const container = ref.current;
    if (container === null || value === lastMarkdownRef.current) {
      return;
    }

    lastMarkdownRef.current = value;
    renderMarkdown(container, value);
  }, [value]);

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
      if (range === null || range.collapsed) {
        return;
      }

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
   * 줄 앞에서 문법을 친 순간 블록을 바꾼다.
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

      if (pendingKey !== '' && !isStandaloneBlock(type)) {
        return false;
      }

      if (
        isStandaloneBlock(type) &&
        getTextAfterCaret(block, range).length > 0
      ) {
        return false;
      }

      const isSameType = type === readBlockType(block);

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

  /** Enter: 커서 위치에서 블록을 쪼갠다. */
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

  /** Backspace: 줄 맨 앞에서 누르면 서식만 벗긴다. */
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
      onInput: publish,
      onCompositionStart: () => {
        isComposingRef.current = true;
      },
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
