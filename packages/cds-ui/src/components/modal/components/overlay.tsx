import { useModalContext } from '../modal-context';

export interface OverlayProps {
  className?: string;
  dataState?: 'open' | 'closed';
}

const Overlay = ({ className, dataState }: OverlayProps) => {
  const { isOpen, onClose } = useModalContext();
  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={className}
      data-state={dataState}
      onClick={onClose}
    />
  );
};

export default Overlay;
