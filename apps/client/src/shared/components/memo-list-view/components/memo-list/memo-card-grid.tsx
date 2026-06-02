import { useEffect, useRef, useState } from 'react';

import Card from '@shared/components/card/card';

import * as styles from './memo-card-grid.css';

type TagType = {
  labelId: number;
  name: string;
};

type CardInfoType = {
  id: number;
  tagList?: TagType[];
  title: string;
  content: string;
  fileCount: number;
  imageCount: number;
  date: string;
};

interface MemoCardItemProps {
  memo: CardInfoType;
  isSelected: boolean;
  isDragging: boolean;
  onSelect: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd: () => void;
}

const MemoCardItem = ({
  memo,
  isSelected,
  isDragging,
  onSelect,
  onDragStart,
  onDragEnd,
}: MemoCardItemProps) => {
  const { id, tagList, title, content, fileCount, imageCount, date } = memo;

  const handleDragStart = () => {
    setTimeout(() => onDragStart(id), 0);
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
          tagList,
          title,
          content,
          fileCount,
          imageCount,
          date,
        }}
        isSelected={isSelected}
        isDragging={isDragging}
        handleCardClick={() => onSelect(id)}
      />
    </div>
  );
};

interface MemoCardGridProps {
  memoData: CardInfoType[];
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
            key={memo.id}
            memo={memo}
            isSelected={selectedId === memo.id}
            isDragging={draggingId === memo.id}
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
