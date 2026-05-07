import MemoListView from '@shared/components/memo-list-view/memo-list-view';

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

  return totalCount === 0 ? (
    <AllMemoEmptyView />
  ) : (
    <MemoListView
      title="전체 메모"
      initialMemos={filteredMemos}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={totalCount ?? 0}
    />
  );
};

export default AllMemoPage;
