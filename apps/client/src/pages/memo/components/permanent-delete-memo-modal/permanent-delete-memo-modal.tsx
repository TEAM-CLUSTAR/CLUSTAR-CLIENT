import { Icon } from '@cds/icon';
import { ButtonV2, Modal } from '@cds/ui';

import * as styles from './permanent-delete-memo-modal.css';

interface PermanentDeleteMemoModalProps {
  open: boolean;
  memoTitle: string;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

const PermanentDeleteMemoModal = ({
  open,
  memoTitle,
  onOpenChange,
  onDeleted,
}: PermanentDeleteMemoModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <p className={styles.title}>메모를 영구 삭제할까요?</p>
            <p className={styles.description}>
              '{memoTitle}'는 휴지통에서도 사라지고 되돌릴 수 없어요.
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
                영구 삭제
              </ButtonV2>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default PermanentDeleteMemoModal;
