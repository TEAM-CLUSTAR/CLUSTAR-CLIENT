import { DragEvent, useState } from 'react';
import { SelectedMemoType } from '@features/ai-panel/types/ai-panel.types';

import MemoCard, {
  MemoCardInfoType,
} from '@pages/memos/components/memo-card/memo-card';

import { MEMO_DRAG_DATA_FORMAT } from '@shared/constants/memo-drag-data';
import { components } from '@shared/types/schema';

import * as styles from './memo-card-list.css';
import { cardContainer } from '@pages/memos/components/memo-card/memo-card.css';

type MemoCardResponse = components['schemas']['MemoDashboardResponse'];

const getCardInfo = (memo: MemoCardResponse): MemoCardInfoType => ({
  title: memo.title,
  content: memo.content,
  createdAt: memo.createdAt,
  tagList: memo.tagList,
  fileCount: memo.fileCount,
  imageCount: memo.imageCount,
  isAiGenerated: memo.isAiGenerated,
  isNew: memo.isNew,
});

interface MemoCardListProps {
  cards: MemoCardResponse[];
  selectedMemoIds?: number[];
  isDraggable?: boolean;
  onClickCard: (memoId: number) => void;
  onDraggingChange?: (isDragging: boolean) => void;
}

const MemoCardList = ({
  cards,
  selectedMemoIds = [],
  isDraggable = false,
  onClickCard,
  onDraggingChange,
}: MemoCardListProps) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDragStart =
    (memo: MemoCardResponse) => (event: DragEvent<HTMLElement>) => {
      const dragData: SelectedMemoType = {
        memoId: memo.memoId,
        title: memo.title,
      };
      event.dataTransfer.setData(
        MEMO_DRAG_DATA_FORMAT,
        JSON.stringify(dragData),
      );
      event.dataTransfer.effectAllowed = 'copy';

      const cardElement = event.currentTarget;
      const mountTarget = cardElement.parentElement ?? document.body;
      const rect = cardElement.getBoundingClientRect();
      const preview = cardElement.cloneNode(true) as HTMLElement;
      preview.style.position = 'fixed';
      preview.style.top = '-9999px';
      preview.style.left = '-9999px';
      preview.style.width = `${rect.width}px`;
      preview.style.height = `${rect.height}px`;
      preview.style.pointerEvents = 'none';
      preview.setAttribute('aria-hidden', 'true');
      preview.className = cardContainer({
        isSelected: selectedMemoIds.includes(memo.memoId),
        isDragging: true,
        isNew: memo.isNew,
      });
      mountTarget.appendChild(preview);

      event.dataTransfer.setDragImage(
        preview,
        event.clientX - rect.left,
        event.clientY - rect.top,
      );

      setTimeout(() => {
        if (preview.parentNode === mountTarget)
          mountTarget.removeChild(preview);
      }, 0);

      setDraggingId(memo.memoId);
      onDraggingChange?.(true);
    };

  const handleDragEnd = () => {
    setDraggingId(null);
    onDraggingChange?.(false);
  };

  return (
    <div className={styles.memoListContainer}>
      <div className={styles.memoListGrid}>
        {cards.map((card) => (
          <MemoCard
            key={card.memoId}
            {...getCardInfo(card)}
            isSelected={selectedMemoIds.includes(card.memoId)}
            isDragging={draggingId === card.memoId}
            draggable={isDraggable}
            onDragStart={handleDragStart(card)}
            onDragEnd={handleDragEnd}
            onClick={() => onClickCard(card.memoId)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoCardList;
