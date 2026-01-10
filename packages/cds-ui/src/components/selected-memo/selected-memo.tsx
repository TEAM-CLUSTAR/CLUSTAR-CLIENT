import { Icon } from '@cds/icon';

import * as styles from './selected-memo.css';

interface SelectedMemoProps {
  memoName: string;
}

const SelectedMemo = ({ memoName }: SelectedMemoProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <Icon name="ic_memo_blue" width={24} height={24} />
          <p className={styles.name}>{memoName}</p>
        </div>
      </div>
    </>
  );
};

export default SelectedMemo;
