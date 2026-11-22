import { type ReactNode, useState } from 'react';

import { Icon } from '@cds/icon';
import { Button, Checkbox, Modal } from '@cds/ui';

import * as styles from './confirm-modal.css';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  hasClose?: boolean;
  type?: 'default' | 'danger';
  hasSecondary?: boolean;
  confirmLabel?: string;
  confirmIcon?: ReactNode;
  confirmCheckLabel?: string;
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
  confirmCheckLabel,
  onConfirm,
}: ConfirmModalProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setIsChecked(false);
  }

  const isConfirmDisabled = confirmCheckLabel !== undefined && !isChecked;

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
          {confirmCheckLabel !== undefined && (
            <label className={styles.confirmCheck}>
              <Checkbox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className={styles.confirmCheckLabel}>
                {confirmCheckLabel}
              </span>
            </label>
          )}
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
                disabled={isConfirmDisabled}
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
