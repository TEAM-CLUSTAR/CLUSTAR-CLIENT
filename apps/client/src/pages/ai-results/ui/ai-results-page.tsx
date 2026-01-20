import { useMemo } from 'react';

import {
  useGetAllMemo,
  useGetMemoTotalCount,
} from '@pages/all-memo/api/queries';

import { type MockMemo } from '@widgets/memo-list/types/memo';
import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

const AiResultsPage = () => {
  const {
    data: allMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllMemo();
  const aiResultMemos = useMemo<MockMemo[]>(() => {
    return allMemos?.filter((memo) => memo.aiResult) ?? [];
  }, [allMemos]);

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
      title="AI 결과물"
      initialMemos={aiResultMemos}
      onAiCreateClick={handleAiCreateClick}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={totalCount}
    />
  );
};

export default AiResultsPage;
