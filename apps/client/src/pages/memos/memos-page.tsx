import { useState } from 'react';
import FilterModal from '@features/filter-modal/filter-modal';
import { PATH } from '@router/path';
import { useNavigate, useSearchParams } from 'react-router';

import { useFlatTags } from '@shared/apis/tag/queries';
import EmptyView from '@shared/components/empty-view/empty-view';

import { useGetAllMemo, useGetMemoTotalCount } from './apis/queries';
import Header from './components/header/header';
import MemoCardList from './components/memo-card-list/memo-card-list';
import { useInfiniteScroll } from './hooks/use-infinite-scroll';

import * as styles from './memos-page.css';

import emptyImage from '/empty.svg';

const AllMemoPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTagIds = searchParams.getAll('tag').map(Number);
  const activeTagIds = selectedTagIds.length ? selectedTagIds : undefined;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: flatTags = [] } = useFlatTags();
  const tagsById = new Map(flatTags.map((tag) => [tag.tagId, tag]));
  const filterChips = selectedTagIds
    .map((id) => tagsById.get(id))
    .filter((tag) => tag !== undefined)
    .map((tag) => ({ id: tag.tagId, tagName: tag.name }));

  const {
    data: memosList,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllMemo(activeTagIds);
  const { data: totalCount } = useGetMemoTotalCount(activeTagIds);

  const handleApplyFilter = (tagIds: number[]) => {
    setSearchParams((prev) => {
      prev.delete('tag');
      tagIds.forEach((id) => prev.append('tag', String(id)));
      return prev;
    });
  };

  const handleRemoveFilter = (tagId: number) => {
    handleApplyFilter(selectedTagIds.filter((id) => id !== tagId));
  };

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const isFilterActive = selectedTagIds.length > 0;
  const showHeaderSection = isFilterActive || totalCount !== 0;

  return (
    <div className={styles.container}>
      {showHeaderSection && (
        <>
          <div className={styles.headerContainer}>
            <Header
              title="전체 메모"
              count={totalCount ?? 0}
              isFilterActive={isFilterActive}
              onOpenFilter={() => setIsFilterOpen(true)}
              filterChips={filterChips}
              onRemoveFilter={handleRemoveFilter}
            />
          </div>
          <FilterModal
            open={isFilterOpen}
            selectedTagIds={selectedTagIds}
            onOpenChange={setIsFilterOpen}
            onApply={handleApplyFilter}
          />
        </>
      )}

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
  );
};

export default AllMemoPage;
