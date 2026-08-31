import { Icon } from '@cds/icon';
import { Button, Modal } from '@cds/ui';

import * as styles from './delete-memo-modal.css';

interface DeleteMemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

const DeleteMemoModal = ({
  open,
  onOpenChange,
  onDeleted,
}: DeleteMemoModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <div className={styles.container}>
          <Modal.Close>
            <button className={styles.closeButton}>
              <Icon name="ic_delete" size={24} color="grey400" />
            </button>
          </Modal.Close>

          <div className={styles.textContainer}>
            <span className={styles.title}>메모를 삭제하시겠습니까?</span>
            <span className={styles.description}>
              삭제된 메모는 다시 복구할 수 없습니다.
            </span>
          </div>
          <div className={styles.buttonContainer}>
            <Modal.Close>
              <Button size="lg" variant="outlined">
                취소
              </Button>
            </Modal.Close>
            <Modal.Close>
              <Button size="lg" onClick={onDeleted}>
                삭제
              </Button>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteMemoModal;
