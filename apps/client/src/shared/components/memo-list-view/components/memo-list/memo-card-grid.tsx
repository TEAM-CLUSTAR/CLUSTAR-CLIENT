import { useEffect, useRef, useState } from 'react';

import Card from '@shared/components/card/card';
import { components } from '@shared/types/schema';

import * as styles from './memo-card-grid.css';

interface MemoCardItemProps {
  memo: components['schemas']['MemoDashboardResponse'];
  isSelected: boolean;
  isDragging: boolean;
  isNewAi: boolean;
  onSelect: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd: () => void;
}

const MemoCardItem = ({
  memo,
  isSelected,
  isDragging,
  isNewAi,
  onSelect,
  onDragStart,
  onDragEnd,
}: MemoCardItemProps) => {
  const {
    memoId,
    labelList,
    title,
    content,
    fileCount,
    imageCount,
    createdAt,
  } = memo;

  const handleDragStart = () => {
    setTimeout(() => onDragStart(memoId ?? 0), 0);
  };

  return (
    <div
      className={styles.gridItem}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <Card
        card={{
          tagList: labelList ?? [],
          title: title ?? '',
          content: content ?? '',
          fileCount: fileCount ?? 0,
          imageCount: imageCount ?? 0,
          createAt: createdAt ?? '',
        }}
        isNewAi={isNewAi}
        isSelected={isSelected}
        isDragging={isDragging}
        onClick={() => onSelect(memoId ?? 0)}
      />
    </div>
  );
};

interface MemoCardGridProps {
  memoData: components['schemas']['MemoDashboardResponse'][];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

const MemoCardGrid = ({
  memoData,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
}: MemoCardGridProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !onLoadMore || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;

      if (scrollBottom < 200) {
        onLoadMore();
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <div ref={scrollContainerRef} className={styles.scrollContainer}>
      <div className={styles.gridContainer}>
        {memoData.map((memo) => (
          <MemoCardItem
            key={memo.memoId}
            memo={memo}
            isSelected={selectedId === memo.memoId}
            isDragging={draggingId === memo.memoId}
            isNewAi={memo.isNew ?? false}
            onSelect={setSelectedId}
            onDragStart={setDraggingId}
            onDragEnd={() => setDraggingId(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoCardGrid;
