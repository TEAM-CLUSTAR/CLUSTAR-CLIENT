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

  return (
    <input
      className={styles.container}
      placeholder="제목을 입력하세요."
      maxLength={55}
      value={title}
      onChange={onChange}
      onBlur={handleBlur}
    />
  );
};

export default InputTitle;
