import { Icon } from '@cds/icon';

import * as styles from './add-memo-button.css';

interface AddMemoButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const AddMemoButton = ({ onClick, disabled }: AddMemoButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="새 메모 탭 열기"
      className={styles.button}
    >
      <Icon name="ic_plus" size={24} color={'primary'} />
    </button>
  );
};

export default AddMemoButton;
