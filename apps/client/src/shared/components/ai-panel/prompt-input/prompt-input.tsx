import { KeyboardEvent, useLayoutEffect, useRef } from 'react';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import PromptOption from './prompt-option/prompt-option';
import SelectedMemo from './selected-memo/selected-memo';

import * as styles from './prompt-input.css';

interface PromptInputValueType {
  text: string;
  selectedOptionId: string | null;
}

interface SelectedMemoType {
  id: string;
  title: string;
}

interface PromptInputProps {
  value: string;
  onChange: (text: string) => void;
  selectedOptionId: string | null;
  onOptionSelect: (optionId: string | null) => void;
  onSubmit: (value: PromptInputValueType) => void;
  disabled?: boolean;
  selectedMemos?: SelectedMemoType[];
  onRemoveMemo: (id: string) => void;
  isDragOver?: boolean;
}

const PromptInput = ({
  value,
  onChange,
  selectedOptionId,
  onOptionSelect,
  onSubmit,
  disabled = false,
  selectedMemos = [],
  onRemoveMemo,
  isDragOver = false,
}: PromptInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey) return;

    e.preventDefault();
    handleSend();
  };

  const trimmedText = value.trim();
  const canSend = trimmedText.length > 0 && !disabled;

  const handleSend = () => {
    if (!canSend) return;

    const submitValue = {
      text: trimmedText,
      selectedOptionId,
    };

    onSubmit(submitValue);
  };

  return (
    <div className={styles.container({ isDragOver })}>
      {selectedMemos.length > 0 && (
        <div className={styles.memoList}>
          {selectedMemos.map(({ id, title }) => (
            <SelectedMemo
              key={id}
              title={title}
              onRemove={() => onRemoveMemo(id)}
            />
          ))}
        </div>
      )}
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="선택한 메모로 만들고 싶은 것에 대해 설명하세요."
        disabled={disabled}
      />
      <div className={styles.footer}>
        <PromptOption
          selectedOptionId={selectedOptionId}
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
