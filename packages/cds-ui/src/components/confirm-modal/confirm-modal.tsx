import * as Dialog from '@radix-ui/react-dialog';

import Button from '../button/button';
import Modal from '../modal/modal';

import * as styles from './confirm-modal.css';

interface ConfirmModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCloseClick: () => void;
  isHavedCancel: boolean;
}

const ConfirmModal = ({
  open,
  onOpenChange,
  onCloseClick,
  isHavedCancel,
}: ConfirmModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <Dialog.Title className={styles.modalTitle}>
              {isHavedCancel
                ? '메모 입력을 취소하시겠습니까?'
                : '메모 저장 완료'}
            </Dialog.Title>
            <Dialog.Description className={styles.modalContent}>
              {isHavedCancel
                ? '입력한 내용이 삭제됩니다.'
                : '성공적으로 저장되었습니다.'}
            </Dialog.Description>
          </div>
          <Modal.Close>
            <div className={styles.buttonContainer}>
              {isHavedCancel && (
                <Button
                  size="lg"
                  onClick={() => onOpenChange?.(false)}
                  variant="outlined"
                >
                  취소
                </Button>
              )}
              <Button size="lg" onClick={onCloseClick}>
                확인
              </Button>
            </div>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmModal;
