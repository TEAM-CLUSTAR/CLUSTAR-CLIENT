import { KeyboardEvent, useLayoutEffect, useRef, useState } from 'react';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import {
  PromptInputValueType,
  SelectedMemoType,
} from '@shared/components/ai-panel/types/types';

import PromptOption from './prompt-option/prompt-option';
import SelectedMemo from './selected-memo/selected-memo';

import * as styles from './prompt-input.css';

interface PromptInputProps {
  onSubmit: (value: PromptInputValueType) => void;
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
  const [option, setOption] = useState('MERGE');

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return;

    e.preventDefault();
    handleSend();
  };

  const trimmedText = value.trim();
  const canSend = trimmedText.length > 0 && !disabled;

  const handleOptionSelect = (optionId: string) => {
    if (optionId === option) return;
    setOption(optionId);
  };

  const handleSend = () => {
    if (!canSend) return;

    onSubmit({
      userPrompt: trimmedText,
      option: option as PromptInputValueType['option'],
    });

    setValue('');
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
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="선택한 메모로 만들고 싶은 것에 대해 설명하세요."
        disabled={disabled}
      />
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
