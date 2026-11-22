import type { ReactNode } from 'react';

import { Icon } from '@cds/icon';
import { Button, Modal } from '@cds/ui';

import * as styles from './confirm-modal.css';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  hasClose?: boolean;
  type?: 'default' | 'danger';
  hasSecondary?: boolean;
  confirmLabel?: string;
  confirmIcon?: ReactNode;
  onConfirm?: () => void;
}

const ConfirmModal = ({
  open,
  onOpenChange,
  title,
  description,
  hasClose = false,
  type = 'default',
  hasSecondary = false,
  confirmLabel = '확인',
  confirmIcon,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <div className={styles.titleRow}>
              <p className={styles.title}>{title}</p>
              {hasClose && (
                <Modal.Close>
                  <button
                    type="button"
                    className={styles.closeButton}
                    aria-label="닫기"
                  >
                    <Icon name="ic_delete" size={16} color="secondary" />
                  </button>
                </Modal.Close>
              )}
            </div>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.buttonContainer}>
            {hasSecondary && (
              <Modal.Close>
                <Button size="md" variant="secondary">
                  취소
                </Button>
              </Modal.Close>
            )}
            <Modal.Close>
              <Button
                size="md"
                variant={type === 'danger' ? 'danger' : 'primary'}
                icon={confirmIcon}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmModal;
