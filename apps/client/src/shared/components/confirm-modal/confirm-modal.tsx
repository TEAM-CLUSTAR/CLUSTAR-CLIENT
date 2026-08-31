import { Button, Modal } from '@cds/ui';

import * as styles from './confirm-modal.css';

// TODO: 이 모달과 관련된 작업 진행 시 이 컴포넌트를 삭제

interface ConfirmModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  hasCancel: boolean;
}

const ConfirmModal = ({
  open,
  onOpenChange,
  onConfirm,
  hasCancel,
}: ConfirmModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <div className={styles.modalContainer}>
          <div className={styles.textContainer}>
            <span className={styles.modalTitle}>
              {hasCancel ? '메모 입력을 취소하시겠습니까?' : '메모 저장 완료'}
            </span>
            <span className={styles.modalContent}>
              {hasCancel
                ? '입력한 내용이 삭제됩니다.'
                : '성공적으로 저장되었습니다.'}
            </span>
          </div>
          <div className={styles.buttonContainer}>
            {hasCancel && (
              <Modal.Close>
                <Button
                  size="lg"
                  onClick={() => onOpenChange?.(false)}
                  variant="outlined"
                >
                  취소
                </Button>
              </Modal.Close>
            )}
            <Modal.Close>
              <Button size="lg" onClick={onConfirm}>
                확인
              </Button>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmModal;
