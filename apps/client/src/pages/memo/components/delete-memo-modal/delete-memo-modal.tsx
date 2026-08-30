import { Icon } from '@cds/icon';
import { Button, Modal } from '@cds/ui';

import * as styles from './delete-memo-modal.css';

interface DeleteMemoModalProps {
  memoId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 메모 삭제 성공 시 호출돼요. 상위(탭)에서 닫기 등 후처리를 담당해요. */
  onDeleted: () => void;
}

const DeleteMemoModal = ({
  memoId,
  open,
  onOpenChange,
  onDeleted,
}: DeleteMemoModalProps) => {
  const handleDeleteMemo = () => {
    if (memoId == null) {
      onDeleted();
      return;
    }

    // TODO: 기존 메모 삭제 API 작업에서 memoId로 Mutation을 호출하고,
    // 성공한 경우에만 onDeleted를 호출해요.
  };

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
              <Button size="lg" onClick={handleDeleteMemo}>
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
