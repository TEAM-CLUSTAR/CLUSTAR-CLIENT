import MemoInput from './components/memo-input/memo-input';

import * as styles from './new-memo-page.css';

const NewMemoPage = () => {
  return (
    <div className={styles.pageContainer}>
      <MemoInput />
    </div>
  );
};

export default NewMemoPage;
