import { ChangeEvent } from 'react';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import PromptOption from './prompt-option';

import * as styles from './prompt-input.css';

export interface PromptInputValueType {
  text: string;
  selectedOptionId: string | null;
}

interface PromptInputProps {
  value: string;
  onChange: (text: string) => void;
  selectedOptionId: string | null;
  onOptionSelect: (optionId: string | null) => void;
  handleSubmit: (value: PromptInputValueType) => void;
}

const PromptInput = ({
  value,
  onChange,
  selectedOptionId,
  onOptionSelect,
  handleSubmit,
}: PromptInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const trimmedText = value.trim();
  const hasValue = trimmedText.length > 0;

  const handleSend = () => {
    //TODO: 추후 API 요청 코드 추가
    const submitValue = {
      text: trimmedText,
      selectedOptionId,
    };

    handleSubmit(submitValue);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        placeholder="선택한 메모를 기반으로 만들고 싶은 것에 대해 설명하세요."
      />
      <div className={styles.footer}>
        <PromptOption
          selectedOptionId={selectedOptionId}
          handleOptionSelect={onOptionSelect}
        />
        <Button onClick={handleSend} size="sm" disabled={!hasValue}>
          <Icon name="ic_send" width={36} height={36} />
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
