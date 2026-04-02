import { ReactNode, useCallback, useMemo, useState } from 'react';

import Close from './components/close';
import Content from './components/content';
import Trigger from './components/trigger';
import useEscapeKey from './hooks/use-escape-key';
import useScrollLock from './hooks/use-scroll-lock';
import { ModalContext } from './modal-context';

interface ModalProps {
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
}: ModalProps) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen); // uncontrolled 모드에서 사용하는 상태값

  const isOpen = isControlled ? open : internalOpen; // Context로 보내는 최종 열림 상태. controlled -> open, uncontrolled -> internalopen

  // 모달을 여는 함수
  const onOpen = useCallback(() => {
    if (!isControlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  // 모달을 닫는 함수
  const onClose = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  useScrollLock(isOpen);
  useEscapeKey({ isOpen, onClose });

  const contextValue = useMemo(
    () => ({ isOpen, onOpen, onClose }),
    [isOpen, onOpen, onClose],
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
