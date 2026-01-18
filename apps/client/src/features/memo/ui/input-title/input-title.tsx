import { ChangeEvent, UIEvent, useRef } from 'react';

import * as styles from './input-title.css';

interface InputTitleProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MAX_LENGTH = 55;

const InputTitle = ({ title, onChange }: InputTitleProps) => {
  const isFocused = useRef(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      onChange(e);
    }
  };

  const handleScroll = (e: UIEvent<HTMLInputElement>) => {
    if (!isFocused.current) {
      e.currentTarget.scrollLeft = 0;
    }
  };

  return (
    <input
      className={styles.container}
      placeholder="제목을 입력하세요."
      maxLength={MAX_LENGTH}
      value={title}
      onChange={handleChange}
      onScroll={handleScroll}
      onFocus={() => {
        isFocused.current = true;
      }}
      onBlur={(e) => {
        isFocused.current = false;
        e.target.scrollLeft = 0;
      }}
    />
  );
};

export default InputTitle;
