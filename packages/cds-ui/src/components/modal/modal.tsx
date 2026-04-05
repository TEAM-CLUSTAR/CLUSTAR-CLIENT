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
  open, // 부모가 넘기는 모달 열림 상태, controlled 모드
  onOpenChange, // 모달 상태가 바뀔 때 부모한테 알리는 콜백
  defaultOpen = false, // uncontrolled 모드의 초기값
}: ModalRootProps) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen); // uncontrolled 모드에서 사용하는 상태값
  const isOpen = isControlled ? open : internalOpen; // Context로 보내는 최종 열림 상태. controlled -> open, uncontrolled -> internalopen

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
