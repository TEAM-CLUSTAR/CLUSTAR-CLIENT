import { MemoInput } from '@widgets/memo';

import * as styles from './new-memo-page.css';

const NewMemoPage = () => {
  return (
    <div className={styles.pageContainer}>
      <MemoInput />
    </div>
  );
};

export default NewMemoPage;
