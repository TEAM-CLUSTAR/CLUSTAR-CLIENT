import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ThemeProvider } from '../../../providers/theme-provider';
import useFocusTrap from '../hooks/use-focus-trap';
import { useModalContext } from '../modal-context';
import Overlay from './overlay';

import * as styles from '../modal.css';

interface PortalProps {
  children: ReactNode;
  container?: HTMLElement;
}
export interface ContentProps {
  children: ReactNode;
  ariaLabel?: string;
}

const Portal = ({ children, container }: PortalProps) => {
  if (typeof document === 'undefined') return null;
  return createPortal(children, container ?? document.body);
};

const Content = ({ children, ariaLabel = 'modal' }: ContentProps) => {
  const { isOpen } = useModalContext();
  const [mounted, setMounted] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen && mounted);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setMounted(false);
  };

  if (!mounted) return null;
  return (
    <Portal>
      <ThemeProvider>
        <Overlay
          className={styles.overlay}
          dataState={isOpen ? 'open' : 'closed'}
        />
        <div
          ref={focusTrapRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className={styles.content}
          data-state={isOpen ? 'open' : 'closed'}
          onAnimationEnd={handleAnimationEnd}
        >
          {children}
        </div>
      </ThemeProvider>
    </Portal>
  );
};

export default Content;
