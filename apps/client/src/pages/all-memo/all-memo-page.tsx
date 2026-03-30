import {
  MemoListView,
  MemoListViewHelpers,
} from '@shared/components/memo-list-view';

import { useGetAllMemo, useGetMemoTotalCount } from './apis/queries';
import AllMemoEmptyView from './components/all-memo-empty-view/all-memo-empty-view';

const AllMemoPage = () => {
  const {
    data: filteredMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllMemo();

  const { data: totalCount } = useGetMemoTotalCount();

  const handleAiCreateClick = (
    memoId: string,
    helpers: MemoListViewHelpers,
  ) => {
    helpers.selectFunction(memoId);
    helpers.setIsAiMode(true);
  };

  return totalCount === 0 ? (
    <AllMemoEmptyView />
  ) : (
    <MemoListView
      title="전체 메모"
      onAiCreateClick={handleAiCreateClick}
      initialMemos={filteredMemos}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={totalCount}
    />
  );
};

export default AllMemoPage;
