import { KeyboardEvent, useLayoutEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import { useCustomScrollbar } from '../../hooks/use-custom-scrollbar';
import {
  PromptInputValueType,
  SelectedMemoType,
} from '../../types/prompt-input';
import PromptOption from './prompt-option/prompt-option';
import SelectedMemo from './selected-memo/selected-memo';

import * as styles from './prompt-input.css';

const MAX_TEXTAREA_HEIGHT = 192;
const MIN_SCROLL_THUMB_HEIGHT = 40;

interface PromptInputProps {
  onSubmit: (value: PromptInputValueType) => boolean;
  disabled?: boolean;
  selectedMemos?: SelectedMemoType[];
  onRemoveMemo: (memoId: number) => void;
  isDragOver: boolean;
}

const PromptInput = ({
  onSubmit,
  disabled = false,
  selectedMemos = [],
  onRemoveMemo,
  isDragOver,
}: PromptInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const [option, setOption] = useState<PromptInputValueType['option']>('MERGE');
  const { scrollbarState, updateScrollbar, handleScrollbarThumbPointerDown } =
    useCustomScrollbar({
      scrollElementRef: textareaRef,
      minThumbHeight: MIN_SCROLL_THUMB_HEIGHT,
    });

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      MAX_TEXTAREA_HEIGHT,
    )}px`;
    updateScrollbar();
  }, [value, updateScrollbar]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return;

    e.preventDefault();
    handleSend();
  };

  const trimmedText = value.trim();
  const canSend = trimmedText.length > 0 && !disabled;

  const handleOptionSelect = (optionId: PromptInputValueType['option']) => {
    if (optionId === option) return;
    setOption(optionId);
  };

  const handleSend = () => {
    if (!canSend) return;

    const isSubmitted = onSubmit({
      userPrompt: trimmedText,
      option,
    });

    if (isSubmitted) {
      setValue('');
    }
  };

  return (
    <div className={styles.container({ isDragOver })}>
      {selectedMemos.length > 0 && (
        <div className={styles.memoList}>
          {selectedMemos.map(({ memoId, title }) => (
            <SelectedMemo
              key={memoId}
              title={title}
              onRemove={() => onRemoveMemo(memoId)}
            />
          ))}
        </div>
      )}
      <div className={styles.textareaContainer}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={updateScrollbar}
          placeholder="선택한 메모로 만들고 싶은 것에 대해 설명하세요."
          disabled={disabled}
        />
        {scrollbarState.isVisible && (
          <div className={styles.scrollbar} aria-hidden="true">
            <div
              className={styles.scrollbarThumb}
              style={{
                height: `${scrollbarState.thumbHeight}px`,
                transform: `translateY(${scrollbarState.thumbTop}px)`,
              }}
              onPointerDown={handleScrollbarThumbPointerDown}
            />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <PromptOption
          selectedOptionId={option}
          onOptionSelect={handleOptionSelect}
          disabled={disabled}
        />
        <Button
          onClick={handleSend}
          size="sm"
          disabled={!canSend}
          aria-label="전송"
        >
          <Icon name="ic_send" size={32} color="white" />
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
