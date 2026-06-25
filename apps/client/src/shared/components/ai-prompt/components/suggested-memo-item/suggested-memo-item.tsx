import { Icon } from '@cds/icon';

import * as styles from './suggested-memo-item.css';

interface SuggestedMemoItemProps {
  memoName: string;
  onClick: () => void;
}

const SuggestedMemoItem = ({ memoName, onClick }: SuggestedMemoItemProps) => {
  return (
    <div className={styles.container}>
      <Icon name="ic_memo" size={24} color="grey700" />
      <span className={styles.memo}>{memoName}</span>
      <button
        type="button"
        aria-label="메모 선택"
        className={styles.addMemo}
        onClick={onClick}
      >
        <Icon name="ic_plus" size={24} color="grey700" />
      </button>
    </div>
  );
};

export default SuggestedMemoItem;
