import { Icon } from '@cds/icon';

import Button from '../button/button';

import * as styles from './alert-modal.css';

interface AlertModalProps {
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  isClosing: boolean;
}

const AlertModal = ({
  title,
  description,
  onClose,
  onConfirm,
  isClosing,
}: AlertModalProps) => {
  return (
    <div className={styles.overlay} data-state={isClosing ? 'closed' : 'open'}>
      <div className={styles.container}>
        <Icon
          name="ic_close"
          width={28}
          height={28}
          className={styles.close}
          onClick={onClose}
        />
        <Icon name="ic_alert" width={56} height={56} />
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
          <Button onClick={onClose} size="lg" variant="outlined">
            취소
          </Button>
          <Button onClick={onConfirm} size="lg">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
