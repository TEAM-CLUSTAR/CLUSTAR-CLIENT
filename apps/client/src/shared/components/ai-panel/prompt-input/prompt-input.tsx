import { ChangeEvent, KeyboardEvent, useLayoutEffect, useRef } from 'react';

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
  handleSubmit: (value: PromptInputValueType) => void;
  disabled?: boolean;
  selectedMemos?: SelectedMemoType[];
  onRemoveMemo?: (id: string) => void;
}

const PromptInput = ({
  value,
  onChange,
  selectedOptionId,
  onOptionSelect,
  handleSubmit,
  disabled = false,
  selectedMemos = [],
  onRemoveMemo,
}: PromptInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

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
  const hasValue = trimmedText.length > 0;
  const hasSelectedMemos = selectedMemos.length > 0;
  const canSend = hasValue && !disabled;

  const handleSend = () => {
    if (!canSend) return;

    const submitValue = {
      text: trimmedText,
      selectedOptionId,
    };

    handleSubmit(submitValue);
  };

  return (
    <div className={styles.container}>
      {hasSelectedMemos && (
        <div className={styles.memoList}>
          {selectedMemos.map((memo) => (
            <SelectedMemo
              key={memo.id}
              title={memo.title}
              onRemove={() => onRemoveMemo?.(memo.id)}
            />
          ))}
        </div>
      )}
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="선택한 메모로 만들고 싶은 것에 대해 설명하세요."
        disabled={disabled}
      />
      <div className={styles.footer}>
        <PromptOption
          selectedOptionId={selectedOptionId}
          handleOptionSelect={onOptionSelect}
          disabled={disabled}
        />
        <Button onClick={handleSend} size="sm" disabled={!canSend}>
          <Icon name="ic_send" size={32} color="white" />
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
