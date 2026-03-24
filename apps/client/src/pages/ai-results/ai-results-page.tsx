import { useMemo } from 'react';

import { AiResultsEmptyView } from '@pages/ai-results/components/ai-results-empty-view';

import {
  MemoListView,
  type MemoListViewHelpers,
} from '@shared/features/memo-list-view';
import { type MockMemo } from '@shared/features/memo-list-view/components/memo-list/types/memo';

import { useGetAIMemo } from './apis/queries';

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
