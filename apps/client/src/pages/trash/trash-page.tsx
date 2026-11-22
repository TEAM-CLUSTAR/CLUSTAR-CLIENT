import { useState } from 'react';
import ListPageLayout from '@layouts/list-page-layout/list-page-layout';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import { useEmptyTrash, useGetTrashMemos } from '@shared/apis/trash/queries';
import { TRASH_KEY } from '@shared/apis/trash/query-key';
import emptyMemoImage from '@shared/assets/images/empty-state/empty-memo.svg';
import ConfirmModal from '@shared/components/confirm-modal/confirm-modal';
import EmptyView from '@shared/components/empty-view/empty-view';
import Header from '@shared/components/header/header';
import MemoCard from '@shared/components/memo-card/memo-card';
import MemoCardGrid from '@shared/components/memo-card-grid/memo-card-grid';
import { useInfiniteScroll } from '@shared/hooks/use-infinite-scroll';

import * as styles from './trash-page.css';

const TrashPage = () => {
  const queryClient = useQueryClient();
  const [isEmptyModalOpen, setIsEmptyModalOpen] = useState(false);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetTrashMemos();
  const memos = data?.memos ?? [];
  const totalCount = data?.totalCount;
  const hasMemos = !!totalCount;

  const { mutate: emptyTrash } = useMutation({
    ...useEmptyTrash(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRASH_KEY.ALL });
    },
  });

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <ListPageLayout
      header={
        <>
          <Header title="휴지통" count={totalCount ?? 0}>
            {hasMemos && (
              <Button
                size="sm"
                variant="ghost"
                icon={<Icon name="ic_trash" size={16} color="primary" />}
                onClick={() => setIsEmptyModalOpen(true)}
              >
                휴지통 비우기
              </Button>
            )}
          </Header>
          {hasMemos && (
            <div className={styles.notice}>
              <Icon name="ic_info" size={16} color="brand" />
              <p className={styles.noticeText}>
                휴지통의 메모는 30일이 지나면 영구 삭제돼요.
              </p>
            </div>
          )}
          <ConfirmModal
            open={isEmptyModalOpen}
            onOpenChange={setIsEmptyModalOpen}
            title="휴지통을 비울까요?"
            description="휴지통에서 사라지고 되돌릴 수 없어요."
            type="danger"
            hasSecondary
            confirmLabel="휴지통 비우기"
            onConfirm={() => emptyTrash()}
          />
        </>
      }
    >
      {totalCount === 0 ? (
        <EmptyView
          imgSrc={emptyMemoImage}
          title="휴지통이 비어 있어요."
          description="지운 메모는 여기에 30일 동안 보관돼요."
        />
      ) : (
        <>
          <MemoCardGrid>
            {memos.map((memo) => (
              <MemoCard
                key={memo.memoId}
                memoId={memo.memoId}
                title={memo.title}
                content={memo.content}
                updatedAt={memo.updatedAt}
                tagList={memo.tagList}
                fileCount={memo.fileCount}
                imageCount={memo.imageCount}
                isAiGenerated={memo.isAiGenerated}
                isNew={false}
              />
            ))}
          </MemoCardGrid>
          <div ref={loadMoreRef} />
        </>
      )}
    </ListPageLayout>
  );
};

export default TrashPage;
