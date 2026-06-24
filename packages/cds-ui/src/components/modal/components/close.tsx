import {
  Children,
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactNode,
} from 'react';

import { useModalContext } from '../modal-context';

export interface CloseProps {
  children: ReactNode;
}
export interface ChildTypes {
  onClick?: (e: MouseEvent) => void;
}

const Close = ({ children }: CloseProps) => {
  const { onClose } = useModalContext();
  const child = Children.only(children);

  if (!isValidElement<ChildTypes>(child)) return null;

  return cloneElement(child, {
    onClick: (e: MouseEvent<Element>) => {
      child.props.onClick?.(e);
      onClose();
    },
  });
};

export default Close;
