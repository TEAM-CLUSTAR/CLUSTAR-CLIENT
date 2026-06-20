import { useEffect } from 'react';

interface UseEscapeKeyTypes {
  isOpen: boolean;
  onClose: () => void;
}

const useEscapeKey = ({ isOpen, onClose }: UseEscapeKeyTypes) => {
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
