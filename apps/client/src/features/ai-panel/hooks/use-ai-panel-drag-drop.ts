import { DragEvent, useRef } from 'react';

import { MEMO_DRAG_DATA_KEY } from '@shared/constants/memo-drag';

interface UseAiPanelDragDropParams {
  onDragOverChange?: (isDragOver: boolean) => void;
  onDropMemo?: (memoId: number) => void;
}

export const useAiPanelDragDrop = ({
  onDragOverChange,
  onDropMemo,
}: UseAiPanelDragDropParams) => {
  const dragDepthRef = useRef(0);

  const handleDragEnter = () => {
    dragDepthRef.current += 1;
    onDragOverChange?.(true);
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    onDragOverChange?.(true);
  };

  const handleDragLeave = () => {
    dragDepthRef.current = Math.max(dragDepthRef.current - 1, 0);

    if (dragDepthRef.current === 0) {
      onDragOverChange?.(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    dragDepthRef.current = 0;
    onDragOverChange?.(false);

    const memoId =
      Number(event.dataTransfer.getData(MEMO_DRAG_DATA_KEY)) ||
      Number(event.dataTransfer.getData('text/plain'));

    if (!Number.isNaN(memoId) && memoId > 0) {
      onDropMemo?.(memoId);
    }
  };

  return {
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  };
};
