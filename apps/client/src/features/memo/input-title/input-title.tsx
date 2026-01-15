import { ChangeEvent, UIEvent } from 'react';

import * as styles from './input-title.css';

interface InputTitleProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputTitle = ({ title, onChange }: InputTitleProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 55) {
      onChange(e);
    }
  };

  const handleScroll = (e: UIEvent<HTMLInputElement>) => {
    if (document.activeElement !== e.currentTarget) {
      e.currentTarget.scrollLeft = 0;
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.scrollLeft = 0;
  };

  return (
    <input
      className={styles.container}
      placeholder="제목을 입력하세요."
      maxLength={55}
      value={title}
      onChange={handleChange}
      onScroll={handleScroll}
      onBlur={handleBlur}
    />
  );
};

export default InputTitle;
