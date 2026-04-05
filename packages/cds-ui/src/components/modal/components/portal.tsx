import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  container?: HTMLElement;
}

const Portal = ({ children, container }: PortalProps) => {
  if (typeof document === 'undefined') return null;
  return createPortal(children, container ?? document.body);
};

export default Portal;
