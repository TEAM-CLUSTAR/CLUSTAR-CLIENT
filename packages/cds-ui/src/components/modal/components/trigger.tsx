import {
  Children,
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactNode,
} from 'react';

import { useModalContext } from '../modal-context';

export interface TriggerProps {
  children: ReactNode;
}
export interface ChildTypes {
  onClick?: (e: MouseEvent) => void;
}

const Trigger = ({ children }: TriggerProps) => {
  const { onOpen } = useModalContext();
  const child = Children.only(children);

  if (!isValidElement<ChildTypes>(child)) return null;

  return cloneElement(child, {
    onClick: (e: MouseEvent) => {
      child.props.onClick?.(e);
      onOpen();
    },
  });
};

export default Trigger;
