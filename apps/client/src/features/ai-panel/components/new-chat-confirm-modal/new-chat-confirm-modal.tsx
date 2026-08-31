import { Icon } from '@cds/icon';
import { Button, Modal } from '@cds/ui';

import * as styles from './new-chat-confirm-modal.css';

interface NewChatConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const NewChatConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
}: NewChatConfirmModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        className={styles.modalContent}
        ariaLabel="새 대화창 생성 확인"
      >
        <div className={styles.container}>
          <Modal.Close>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="모달 닫기"
            >
              <Icon name="ic_delete" size={24} color="grey700" />
            </button>
          </Modal.Close>

          <div className={styles.textContainer}>
            <span className={styles.title}>새 대화창을 생성하시겠습니까?</span>
            <span className={styles.description}>
              이전 대화 내용은 모두 삭제됩니다.
            </span>
          </div>

          <div className={styles.buttonContainer}>
            <div className={styles.buttonWrapper}>
              <Modal.Close>
                <Button size="lg" variant="outlined">
                  취소
                </Button>
              </Modal.Close>
            </div>
            <div className={styles.buttonWrapper}>
              <Modal.Close>
                <Button size="lg" onClick={onConfirm}>
                  확인
                </Button>
              </Modal.Close>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default NewChatConfirmModal;
