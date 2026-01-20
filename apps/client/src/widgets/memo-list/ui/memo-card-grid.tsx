import { useEffect, useRef, useState } from 'react';

import { Card, DetailModal } from '@cds/ui';

import useSingleAndDoubleClick from '@shared/hooks/use-single-and-double-click';

import type { MockMemo } from '@widgets/memo-list/types/memo';

import * as styles from './memo-card-grid.css';

interface MemoCardItemProps {
  memo: MockMemo;
  isAiMode: boolean;
  isSelected: boolean;
  disabled: boolean;
  onAiSelectToggle: (id: string) => void;
  onAiCreateClick?: (memoId: string) => void;
}

const MemoCardItem = ({
  memo,
  isAiMode,
  isSelected,
  disabled,
  onAiSelectToggle,
  onAiCreateClick,
}: MemoCardItemProps) => {
  const {
    id,
    item,
    title,
    contents,
    fileCount,
    imageCount,
    date,
    imageUrl,
    imageAlt,
    aiResult,
    aiNewResult,
    selectedMemos,
  } = memo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasImage = !!imageUrl;
  const cardClassName = hasImage ? styles.gridItemWithImage : styles.gridItem;

  const handleSelect = () => {
    if (!disabled && isAiMode) {
      onAiSelectToggle(id);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleClick = useSingleAndDoubleClick({
    handleSingleClick: isAiMode ? handleSelect : handleModalOpen,
    handleDoubleClick: handleModalOpen,
  });

  return (
    <div className={cardClassName}>
      <DetailModal
        labelList={{
          labelItems: item,
          dateText: date,
        }}
        textContent={{
          isAiResult: aiResult ?? false,
          title,
          content: contents,
        }}
        images={
          imageUrl
            ? [
                {
                  imageUrl,
                  imageAlt: imageAlt ?? '',
                },
              ]
            : undefined
        }
        selectedMemos={selectedMemos}
        memoId={id}
        onAiCreateClick={onAiCreateClick}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <Card
          item={item}
          title={title}
          contents={contents}
          fileCount={fileCount}
          imageCount={imageCount}
          date={date}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          isAiMode={isAiMode}
          isSelectedCard={isSelected}
          aiResult={aiResult}
          aiNewResult={aiNewResult}
          onClick={disabled ? undefined : handleClick}
        />
      </DetailModal>
    </div>
  );
};

interface CardGridListProps {
  memoData: MockMemo[];
  isAiMode: boolean;
  selectedIds: Set<string>;
  onAiSelectToggle: (id: string) => void;
  hasAiComponent?: boolean;
  disabled?: boolean;
  onAiCreateClick?: (memoId: string) => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

const MemoCardGrid = ({
  memoData,
  isAiMode,
  selectedIds,
  onAiSelectToggle,
  hasAiComponent = false,
  disabled = false,
  onAiCreateClick,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
}: CardGridListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <div className={styles.scrollContainer({ hasAiComponent })}>
      <div className={styles.gridContainer({ hasAiComponent })}>
        {memoData.map((memo) => {
          const isSelected = selectedIds.has(memo.id);

          return (
            <MemoCardItem
              key={memo.id}
              memo={memo}
              isAiMode={isAiMode}
              isSelected={isSelected}
              disabled={disabled}
              onAiSelectToggle={onAiSelectToggle}
              onAiCreateClick={onAiCreateClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MemoCardGrid;
