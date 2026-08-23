import {
  PointerEvent as ReactPointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface ScrollbarState {
  isVisible: boolean;
  thumbHeight: number;
  thumbTop: number;
}

interface UseCustomScrollbarParams<T extends HTMLElement> {
  scrollElementRef: RefObject<T | null>;
  contentElementRef?: RefObject<HTMLElement | null>;
  minThumbHeight: number;
}

export const useCustomScrollbar = <T extends HTMLElement>({
  scrollElementRef,
  contentElementRef,
  minThumbHeight,
}: UseCustomScrollbarParams<T>) => {
  const [scrollbarState, setScrollbarState] = useState<ScrollbarState>({
    isVisible: false,
    thumbHeight: 0,
    thumbTop: 0,
  });

  const updateScrollbar = useCallback(() => {
    const scrollElement = scrollElementRef.current;
    if (!scrollElement) return;

    const { clientHeight, scrollHeight, scrollTop } = scrollElement;
    const isVisible = scrollHeight > clientHeight;

    if (!isVisible) {
      setScrollbarState({
        isVisible: false,
        thumbHeight: 0,
        thumbTop: 0,
      });
      return;
    }

    const thumbHeight = Math.max(
      (clientHeight / scrollHeight) * clientHeight,
      minThumbHeight,
    );
    const maxThumbTop = clientHeight - thumbHeight;
    const maxScrollTop = scrollHeight - clientHeight;
    const thumbTop =
      maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;

    setScrollbarState({
      isVisible: true,
      thumbHeight,
      thumbTop,
    });
  }, [minThumbHeight, scrollElementRef]);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    const contentElement = contentElementRef?.current;

    if (
      !scrollElement ||
      !contentElement ||
      typeof ResizeObserver === 'undefined'
    ) {
      window.addEventListener('resize', updateScrollbar);

      return () => {
        window.removeEventListener('resize', updateScrollbar);
      };
    }

    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(scrollElement);
    resizeObserver.observe(contentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [contentElementRef, scrollElementRef, updateScrollbar]);

  const handleScrollbarThumbPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const scrollElement = scrollElementRef.current;
    if (!scrollElement) return;

    event.preventDefault();

    const startY = event.clientY;
    const startScrollTop = scrollElement.scrollTop;
    const scrollableHeight =
      scrollElement.scrollHeight - scrollElement.clientHeight;
    const movableThumbHeight =
      scrollElement.clientHeight - scrollbarState.thumbHeight;

    const handlePointerMove = (pointerEvent: PointerEvent) => {
      const deltaY = pointerEvent.clientY - startY;
      const scrollRatio =
        movableThumbHeight > 0 ? scrollableHeight / movableThumbHeight : 0;

      scrollElement.scrollTop = startScrollTop + deltaY * scrollRatio;
      updateScrollbar();
    };

    const handlePointerUp = () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  return {
    scrollbarState,
    updateScrollbar,
    handleScrollbarThumbPointerDown,
  };
};
