import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { ThemeProvider } from '../../providers/theme-provider';

import * as styles from './modal.css';

interface ModalRootProps {
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

const ModalRoot = ({
  defaultOpen,
  open,
  onOpenChange,
  children,
}: ModalRootProps) => {
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

const ModalTrigger = ({ children }: ModalTriggerProps) => {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
};

const ModalClose = ({ children }: ModalCloseProps) => {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
};

const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <Dialog.Portal>
      <ThemeProvider>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
          className={styles.content}
        >
          {children}
        </Dialog.Content>
      </ThemeProvider>
    </Dialog.Portal>
  );
};

const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Close: ModalClose,
  Content: ModalContent,
});

export default Modal;
