import { ChangeEvent } from 'react';

import * as styles from './input-title.css';

interface InputTitleProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputTitle = ({ title, onChange }: InputTitleProps) => {
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.scrollLeft = 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 55) {
      onChange(e);
    }
  };

  return (
    <input
      className={styles.container}
      placeholder="제목을 입력하세요."
      maxLength={55}
      value={title}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default InputTitle;
