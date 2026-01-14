import * as styles from './input-title.css';

const InputTitle = () => {
  return (
    <textarea
      className={styles.container}
      placeholder="정리하고 싶은 내용을 메모하세요."
    />
  );
};

export default InputTitle;
