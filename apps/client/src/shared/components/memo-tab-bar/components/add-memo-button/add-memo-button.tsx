import { Icon } from '@cds/icon';

import * as styles from './add-memo-button.css';

interface AddMemoButtonProps {
  onClick: () => void;
}

const AddMemoButton = ({ onClick }: AddMemoButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="새 메모 탭 열기"
      className={styles.button}
    >
      <Icon name="ic_plus" size={24} color={'grey700'} />
    </button>
  );
};

export default AddMemoButton;
