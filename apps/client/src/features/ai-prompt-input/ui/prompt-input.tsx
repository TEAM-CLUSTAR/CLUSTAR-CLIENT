import { ChangeEvent, useState } from 'react';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import PromptOption from './prompt-option';

import * as styles from './prompt-input.css';

export interface PromptInputValueType {
  text: string;
  selectedOptionId: string | null;
}

interface PromptInputProps {
  handleSubmit: (value: PromptInputValueType) => void;
}

const PromptInput = ({ handleSubmit }: PromptInputProps) => {
  const [text, setText] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOptionSelect = (optionId: string | null) => {
    setSelectedOptionId(optionId);
  };

  const trimmedText = text.trim();
  const hasValue = trimmedText.length > 0;

  const handleSend = () => {
    //TODO: 추후 API 요청 코드 추가
    const value = {
      text: trimmedText,
      selectedOptionId,
    };

    handleSubmit(value);
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={handleChange}
        placeholder="선택한 메모를 기반으로 만들고 싶은 것에 대해 설명하세요."
      />
      <div className={styles.footer}>
        <PromptOption
          selectedOptionId={selectedOptionId}
          handleOptionSelect={handleOptionSelect}
        />
        <Button onClick={handleSend} size="sm" disabled={!hasValue}>
          <Icon name="ic_send" width={36} height={36} />
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;
