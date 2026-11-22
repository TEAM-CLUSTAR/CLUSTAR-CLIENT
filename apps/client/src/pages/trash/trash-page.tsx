import ListPageLayout from '@layouts/list-page-layout/list-page-layout';

import { Icon } from '@cds/icon';
import { Button } from '@cds/ui';

import { useGetTrashMemos } from '@shared/apis/trash/queries';
import emptyMemoImage from '@shared/assets/images/empty-state/empty-memo.svg';
import EmptyView from '@shared/components/empty-view/empty-view';
import Header from '@shared/components/header/header';
import MemoCard from '@shared/components/memo-card/memo-card';
import MemoCardGrid from '@shared/components/memo-card-grid/memo-card-grid';
import { useInfiniteScroll } from '@shared/hooks/use-infinite-scroll';

import * as styles from './trash-page.css';

const TrashPage = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetTrashMemos();
  const memos = data?.memos ?? [];
  const totalCount = data?.totalCount;

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
            <Button
              size="sm"
              variant="ghost"
              icon={<Icon name="ic_trash" size={16} color="primary" />}
            >
              휴지통 비우기
            </Button>
          </Header>
          <div className={styles.notice}>
            <Icon name="ic_info" size={16} color="brand" />
            <p className={styles.noticeText}>
              휴지통의 메모는 30일이 지나면 영구 삭제돼요.
            </p>
          </div>
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
