import { useEffect, useState } from 'react';

import { useModalContext } from '../modal-context';

export interface OverlayProps {
  className?: string;
  dataState?: 'open' | 'closed';
}

const Overlay = ({ className, dataState }: OverlayProps) => {
  const { isOpen, onClose } = useModalContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setMounted(false);
  };

  if (!mounted) return null;
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={className}
      data-state={dataState}
      onAnimationEnd={handleAnimationEnd}
      onClick={onClose}
    />
  );
};

export default Overlay;
