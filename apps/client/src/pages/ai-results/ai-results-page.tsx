import { useMemo } from 'react';

import {
  MemoListView,
  MemoListViewHelpers,
} from '@shared/components/memo-list-view';
import { MockMemo } from '@shared/types/memo';

import { useGetAIMemo } from './apis/queries';
import AiResultsEmptyView from './components/ai-results-empty-view/ai-results-empty-view';

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
