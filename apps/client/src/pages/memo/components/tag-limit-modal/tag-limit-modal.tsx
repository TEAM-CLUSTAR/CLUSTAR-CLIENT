import { Icon } from '@cds/icon';
import { Button, Modal } from '@cds/ui';

import * as styles from './tag-limit-modal.css';

interface TagLimitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TagLimitModal = ({ open, onOpenChange }: TagLimitModalProps) => {
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
            <span className={styles.title}>태그를 생성할 수 없습니다.</span>
            <span className={styles.description}>
              태그는 최대 10개까지 추가할 수 있습니다.
            </span>
          </div>
          <Modal.Close>
            <Button size="lg">확인</Button>
          </Modal.Close>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default TagLimitModal;
