import { Icon } from '@cds/icon';

import Button from '../button/button';
import Modal from '../modal/modal';

import * as styles from './alert-modal.css';

interface AlertModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertModal = ({
  title,
  description,
  onConfirm,
  open,
  onOpenChange,
}: AlertModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <div className={styles.container}>
          <Modal.Close>
            <button type="button" className={styles.close}>
              <Icon name="ic_close" width={28} height={28} />
            </button>
          </Modal.Close>
          <Icon name="ic_alert" width={56} height={56} />
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
          <div className={styles.buttonContainer}>
            <Modal.Close>
              <Button size="lg" variant="outlined">
                취소
              </Button>
            </Modal.Close>
            <Modal.Close>
              <Button onClick={onConfirm} size="lg">
                확인
              </Button>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default AlertModal;
