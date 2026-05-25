import { ReactNode, useCallback, useMemo, useState } from 'react';

import Close from './components/close';
import Content from './components/content';
import Trigger from './components/trigger';
import useEscapeKey from './hooks/use-escape-key';
import useScrollLock from './hooks/use-scroll-lock';
import { ModalContext } from './modal-context';

interface ModalRootProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const ModalRoot = ({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
}: ModalRootProps) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  useScrollLock(isOpen);
  useEscapeKey({ isOpen, onClose: () => handleOpenChange(false) });

  const contextValue = useMemo(
    () => ({
      isOpen,
      onOpen: () => handleOpenChange(true),
      onClose: () => handleOpenChange(false),
    }),
    [isOpen, handleOpenChange],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

const Modal = Object.assign(ModalRoot, {
  Trigger,
  Content,
  Close,
});

export default Modal;
