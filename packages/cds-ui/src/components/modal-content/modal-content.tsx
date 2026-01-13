import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import * as styles from './modal-content.css';

interface ModalContentProps {
  children: ReactNode;
}

const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>{children}</Dialog.Content>
    </Dialog.Portal>
  );
};

export default ModalContent;
