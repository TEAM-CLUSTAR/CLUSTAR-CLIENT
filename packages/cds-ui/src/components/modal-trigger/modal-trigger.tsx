import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalTriggerProps {
  children: ReactNode;
}

const ModalTrigger = ({ children }: ModalTriggerProps) => {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
};

export default ModalTrigger;
