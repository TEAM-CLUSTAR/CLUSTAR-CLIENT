import { useMemo } from 'react';

import EmptyView from '@shared/components/empty-view/empty-view';
import {
  MemoListView,
  MemoListViewHelpers,
} from '@shared/components/memo-list-view';
import { MockMemo } from '@shared/types/memo';

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
    <EmptyView
      title="저장된 AI 기록이 없습니다."
      description="AI 기록을 생성해보세요."
    />
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
