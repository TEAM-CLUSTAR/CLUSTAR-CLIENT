import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Card, DetailModal } from '@cds/ui';

import { ALL_MEMO_KEY } from '@pages/all-memo/api/query-key';

import useSingleAndDoubleClick from '@shared/hooks/use-single-and-double-click';

import { useDetailMemo } from '@entities/tree-view/api/queries';

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
  } = memo;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // 모달이 열릴 때만 API 호출
  const {
    data: memoDetail = {
      memoId: 0,
      title: '',
      content: '',
      images: [],
      files: [],
      labelList: [],
      createdAt: '',
      isAiGenerated: false,
      sourceMemoTitleList: [],
    },
  } = useDetailMemo({ memoId: Number(id), enabled: isModalOpen });

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      queryClient.invalidateQueries({ queryKey: ALL_MEMO_KEY.ALL });
    }
  };

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

  const handleAiCreateClick = (memoId: number) => {
    if (onAiCreateClick) {
      onAiCreateClick(String(memoId));
    }
  };

  return (
    <div className={cardClassName}>
      <DetailModal
        open={isModalOpen}
        onOpenChange={handleModalOpenChange}
        id={Number(id)}
        data={memoDetail}
        onAiCreateClick={handleAiCreateClick}
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

interface MemoCardGridProps {
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
}: MemoCardGridProps) => {
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
    <div
      ref={scrollContainerRef}
      className={styles.scrollContainer({ hasAiComponent })}
    >
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
