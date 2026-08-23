import { RefObject, useEffect } from 'react';

import { useCustomScrollbar } from './use-custom-scrollbar';

const MIN_SCROLL_THUMB_HEIGHT = 4;

interface UseAiPanelScrollParams {
  chatAreaRef: RefObject<HTMLDivElement | null>;
  chatContentRef: RefObject<HTMLDivElement | null>;
  hasSuggestedMemos: boolean;
  shouldShowLoadingMessage: boolean;
  visibleMessagesLength: number;
}

export const useAiPanelScroll = ({
  chatAreaRef,
  chatContentRef,
  hasSuggestedMemos,
  shouldShowLoadingMessage,
  visibleMessagesLength,
}: UseAiPanelScrollParams) => {
  const { scrollbarState, updateScrollbar, handleScrollbarThumbPointerDown } =
    useCustomScrollbar({
      scrollElementRef: chatAreaRef,
      contentElementRef: chatContentRef,
      minThumbHeight: MIN_SCROLL_THUMB_HEIGHT,
    });

  useEffect(() => {
    updateScrollbar();
  }, [
    visibleMessagesLength,
    shouldShowLoadingMessage,
    hasSuggestedMemos,
    updateScrollbar,
  ]);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (!chatArea || visibleMessagesLength === 0) return;

    const timeoutId = window.setTimeout(() => {
      chatArea.scrollTo({
        top: chatArea.scrollHeight,
        behavior: 'smooth',
      });
      updateScrollbar();
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    chatAreaRef,
    visibleMessagesLength,
    shouldShowLoadingMessage,
    updateScrollbar,
  ]);

  return {
    scrollbarState,
    updateScrollbar,
    handleScrollbarThumbPointerDown,
  };
};
