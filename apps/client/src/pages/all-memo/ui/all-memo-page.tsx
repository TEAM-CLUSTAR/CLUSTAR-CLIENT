import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

import { useGetAllMemo, useGetMemoTotalCount } from '../api/queries';

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

  return (
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
