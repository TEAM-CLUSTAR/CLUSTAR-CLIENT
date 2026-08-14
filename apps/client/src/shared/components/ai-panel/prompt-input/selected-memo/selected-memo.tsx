import { Icon } from '@cds/icon';

import * as styles from './selected-memo.css';

interface SelectedMemoProps {
  title: string;
  onRemove: () => void;
}

const SelectedMemo = ({ title, onRemove }: SelectedMemoProps) => {
  return (
    <div className={styles.container}>
      <Icon name="ic_memo" size={24} />
      <span className={styles.title}>{title}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`${title} 메모 선택 해제`}
      >
        <Icon name="ic_delete" size={20} />
      </button>
    </div>
  );
};

export default SelectedMemo;
