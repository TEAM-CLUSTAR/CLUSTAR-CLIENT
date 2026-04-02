import { Children, cloneElement, isValidElement, ReactNode } from 'react';

import { useModalContext } from '../modal-context';

export interface TriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export interface ChildTypes {
  onClick?: (e: React.MouseEvent) => void;
}

const Trigger = ({ children }: TriggerProps) => {
  const { onOpen } = useModalContext();

  const child = Children.only(children);

  if (!isValidElement<ChildTypes>(child)) return null;

  return cloneElement(child, {
    onClick: (e: React.MouseEvent) => {
      child.props.onClick?.(e);
      onOpen();
    },
  });
};

export default Trigger;
