import { Icon } from '@cds/icon';

import * as styles from './selected-memo.css';

export interface SelectedMemoProps {
  memoName: string;
}

const SelectedMemo = ({ memoName }: SelectedMemoProps) => {
  return (
    <div className={styles.container}>
      <Icon name="ic_memo_blue" size={24} />
      <span className={styles.name}>{memoName}</span>
    </div>
  );
};

export default SelectedMemo;
