import { Icon } from '@cds/icon';
import { ButtonV2, Modal } from '@cds/ui';

import * as styles from './trash-memo-modal.css';

interface TrashMemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

const TrashMemoModal = ({
  open,
  onOpenChange,
  onDeleted,
}: TrashMemoModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <p className={styles.title}>메모를 휴지통으로 옮길까요?</p>
            <p className={styles.description}>
              휴지통에서 언제든 다시 복원할 수 있어요.
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Modal.Close>
              <ButtonV2 size="md" variant="secondary">
                취소
              </ButtonV2>
            </Modal.Close>
            <Modal.Close>
              <ButtonV2
                size="md"
                variant="danger"
                icon={<Icon name="ic_trash" size={20} color="white" />}
                onClick={onDeleted}
              >
                휴지통으로 이동
              </ButtonV2>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default TrashMemoModal;
