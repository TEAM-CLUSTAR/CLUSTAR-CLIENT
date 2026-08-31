import { ChangeEvent, type FocusEvent, UIEvent, useState } from 'react';

import * as styles from './input-title.css';

interface InputTitleProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MAX_LENGTH = 55;

const InputTitle = ({ title, onChange }: InputTitleProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      onChange(e);
    }
  };

  const handleScroll = (e: UIEvent<HTMLInputElement>) => {
    if (!isFocused) {
      e.currentTarget.scrollLeft = 0;
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    e.currentTarget.scrollLeft = 0;
  };

  return (
    <input
      className={styles.container}
      placeholder={isFocused ? undefined : '제목을 입력하세요.'}
      maxLength={MAX_LENGTH}
      value={title}
      onChange={handleChange}
      onScroll={handleScroll}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default InputTitle;
