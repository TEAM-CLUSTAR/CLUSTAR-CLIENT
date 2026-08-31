import { KeyboardEvent, useLayoutEffect, useRef } from 'react';
import {
  PromptInputValueType,
  SelectedMemoType,
} from '@features/ai-panel/types/ai-panel.types';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import PromptOption from './prompt-option/prompt-option';
import SelectedMemo from './selected-memo/selected-memo';

import * as styles from './prompt-input.css';

interface PromptInputProps {
  value: PromptInputValueType;
  onPromptChange: (value: string) => void;
  onOptionSelect: (option: PromptInputValueType['option']) => void;
  onSubmit: () => boolean;
  disabled?: boolean;
  selectedMemos?: SelectedMemoType[];
  onRemoveMemo: (memoId: number) => void;
}

const PromptInput = ({
  value,
  onPromptChange,
  onOptionSelect,
  onSubmit,
  disabled = false,
  selectedMemos = [],
  onRemoveMemo,
}: PromptInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value.userPrompt]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return;

    e.preventDefault();
    handleSend();
  };

  const trimmedText = value.userPrompt.trim();
  const canSend =
    trimmedText.length > 0 && selectedMemos.length > 0 && !disabled;

  const handleSend = () => {
    if (!canSend) return;

    onSubmit();
  };

  return (
    <div className={styles.container}>
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
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value.userPrompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="선택한 메모로 만들고 싶은 것에 대해 설명하세요."
        disabled={disabled}
      />
      <div className={styles.footer}>
        <PromptOption
          selectedOptionId={value.option}
          onOptionSelect={onOptionSelect}
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
