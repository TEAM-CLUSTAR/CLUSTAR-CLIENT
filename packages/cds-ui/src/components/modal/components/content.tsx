import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ThemeProvider } from '../../../providers/theme-provider';
import useFocusTrap from '../hooks/use-focus-trap';
import { useModalContext } from '../modal-context';

import * as styles from '../modal.css';

export interface ContentProps {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

const Content = ({
  className,
  children,
  ariaLabel = 'modal',
}: ContentProps) => {
  const { isOpen, onClose } = useModalContext();
  const [mounted, setMounted] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen && mounted);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setMounted(false);
  };

  if (!mounted) return null;
  return createPortal(
    <ThemeProvider>
      {/* Overlay */}
      <div
        role="presentation"
        aria-hidden="true"
        className={styles.overlay}
        data-state={isOpen ? 'open' : 'closed'}
        onAnimationEnd={handleAnimationEnd}
        onClick={onClose}
      />
      {/* Content */}
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={[styles.content, className].filter(Boolean).join(' ')}
        data-state={isOpen ? 'open' : 'closed'}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </ThemeProvider>,
    document.body,
  );
};

export default Content;
