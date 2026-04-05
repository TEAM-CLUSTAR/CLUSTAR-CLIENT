import { useEffect } from 'react';

interface useEscapeKeyTypes {
  isOpen: boolean;
  onClose: () => void;
}

const useEscapeKey = ({ isOpen, onClose }: useEscapeKeyTypes) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
};

export default useEscapeKey;
