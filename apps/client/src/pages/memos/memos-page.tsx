import { useState } from 'react';
import FilterModal from '@features/filter-modal/filter-modal';
import { PATH } from '@router/path';
import { useNavigate, useSearchParams } from 'react-router';

import EmptyView from '@shared/components/empty-view/empty-view';

import { useGetAllMemo, useGetMemoTotalCount } from './apis/queries';
import Header from './components/header/header';
import MemoCardList from './components/memo-card-list/memo-card-list';
import { useInfiniteScroll } from './hooks/use-infinite-scroll';

import * as styles from './memos-page.css';

import emptyImage from '/empty.svg';

const AllMemoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get('tag');
  const tagIds = tagParam !== null ? [Number(tagParam)] : undefined;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: memosList,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllMemo(tagIds);
  const { data: totalCount } = useGetMemoTotalCount(tagIds);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <>
      <Header
        title="전체 메모"
        count={totalCount ?? 0}
        isFilterActive={false}
        onOpenFilter={() => setIsFilterOpen(true)}
        filterChips={[]}
        onRemoveFilter={() => {}}
      />

      <FilterModal
        open={isFilterOpen}
        selectedTagIds={[]}
        onOpenChange={setIsFilterOpen}
        onApply={() => setIsFilterOpen(false)}
      />

      <div className={styles.container}>
        {totalCount === 0 ? (
          <EmptyView
            imgSrc={emptyImage}
            title="작성된 메모가 없습니다."
            description="새 메모 창에 들어가서 새로운 메모를 생성해보세요."
            buttonText="메모 작성하러 가기"
            onButtonClick={() => navigate(PATH.MEMO)}
          />
        ) : (
          <>
            {/* 카드 선택/드래그, 상세 페이지 연결 전까지 임시 값 전달 */}
            <MemoCardList
              cards={memosList ?? []}
              isSelected={false}
              isDragging={false}
              onClickCard={() => {}}
            />
            <div ref={loadMoreRef} />
          </>
        )}
      </div>
    </>
  );
};

export default AllMemoPage;
