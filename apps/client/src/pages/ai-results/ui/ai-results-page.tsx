import { useMemo } from 'react';

import { AiResultsEmptyView } from '@widgets/ai-results-empty-view';
import { type MockMemo } from '@widgets/memo-list/types/memo';
import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

import { useGetAIMemo } from '../apis/queries';

const AiResultsPage = () => {
  const {
    data: aiMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAIMemo();
  const aiResultMemos = useMemo<MockMemo[]>(() => {
    return aiMemos?.filter((memo) => memo.aiResult) ?? [];
  }, [aiMemos]);
  const handleAiCreateClick = (
    memoId: string,
    helpers: MemoListViewHelpers,
  ) => {
    helpers.selectFunction(memoId);
    helpers.setIsAiMode(true);
  };

  return aiResultMemos.length === 0 ? (
    <AiResultsEmptyView />
  ) : (
    <MemoListView
      title="AI 기록"
      initialMemos={aiResultMemos}
      onAiCreateClick={handleAiCreateClick}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={aiResultMemos.length}
    />
  );
};

export default AiResultsPage;
