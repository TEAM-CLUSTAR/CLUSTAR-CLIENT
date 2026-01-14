import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import * as styles from './modal.css';

interface ModalProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}
interface ModalTriggerProps {
  children: ReactNode;
}
interface ModalCloseProps {
  children: ReactNode;
}
interface ModalContentProps {
  children: ReactNode;
}

export const Modal = ({
  defaultOpen,
  open,
  onOpenChange,
  children,
}: ModalProps) => {
  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </Dialog.Root>
  );
};

export const ModalTrigger = ({ children }: ModalTriggerProps) => {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
};

export const ModalClose = ({ children }: ModalCloseProps) => {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
};

export const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content className={styles.content}>{children}</Dialog.Content>
    </Dialog.Portal>
  );
};
