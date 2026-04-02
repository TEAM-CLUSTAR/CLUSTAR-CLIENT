import { Children, cloneElement, isValidElement, ReactNode } from 'react';

import { useModalContext } from '../modal-context';

export interface CloseProps {
  children: ReactNode;
  className?: string;
}

export interface ChildTypes {
  onClick?: (e: React.MouseEvent) => void;
}

const Close = ({ children }: CloseProps) => {
  const { onClose } = useModalContext();

  const child = Children.only(children);

  if (!isValidElement<ChildTypes>(child)) return null;

  return cloneElement(child, {
    onClick: (e: React.MouseEvent<Element>) => {
      child.props.onClick?.(e);
      onClose();
    },
  });
};

export default Close;
