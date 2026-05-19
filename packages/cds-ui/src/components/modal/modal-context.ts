import { createContext, useContext } from 'react';

interface ModalContextTypes {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalContext = createContext<ModalContextTypes | null>(null);

export const useModalContext = (): ModalContextTypes => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      'useModalContext는 Modal 컴포넌트 내부에서만 사용할 수 있습니다.',
    );
  }

  return context;
};
