import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Card, DetailModal } from '@cds/ui';

import { ALL_MEMO_KEY } from '@pages/all-memo/apis/query-key';

import { MockMemo } from '../../../../types/memo';
import { useDetailMemo } from '../tree-view/components/tree-memo/apis/queries';

import * as styles from './memo-card-grid.css';

interface MemoCardItemProps {
  memo: MockMemo;
}

const MemoCardItem = ({ memo }: MemoCardItemProps) => {
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

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={cardClassName}>
      <DetailModal
        open={isModalOpen}
        onOpenChange={handleModalOpenChange}
        id={Number(id)}
        data={memoDetail}
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
          aiResult={aiResult}
          aiNewResult={aiNewResult}
          onClick={handleClick}
        />
      </DetailModal>
    </div>
  );
};

interface MemoCardGridProps {
  memoData: MockMemo[];
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
          <MemoCardItem key={memo.id} memo={memo} />
        ))}
      </div>
    </div>
  );
};

export default MemoCardGrid;
