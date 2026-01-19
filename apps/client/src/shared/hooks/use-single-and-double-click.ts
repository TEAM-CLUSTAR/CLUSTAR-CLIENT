import { useRef } from 'react';

interface UseSingleAndDoubleClickProps {
  handleSingleClick: () => void;
  handleDoubleClick: () => void;
  delay?: number;
}

function useSingleAndDoubleClick({
  handleSingleClick,
  handleDoubleClick,
  delay = 200,
}: UseSingleAndDoubleClickProps) {
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      handleDoubleClick();
    } else {
      clickTimeout.current = setTimeout(() => {
        handleSingleClick();
        clickTimeout.current = null;
      }, delay);
    }
  };

  return handleClick;
}

export default useSingleAndDoubleClick;
