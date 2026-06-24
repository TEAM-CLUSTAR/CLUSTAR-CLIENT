import { useMemo } from 'react';

import EmptyView from '@shared/components/empty-view/empty-view';
import MemoListView from '@shared/components/memo-list-view/memo-list-view';
import { components } from '@shared/types/schema';

import { useGetAIMemo } from './apis/queries';

type CardType = components['schemas']['MemoDashboardResponse'];

const AiResultsPage = () => {
  const {
    data: aiMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAIMemo();
  const aiResultMemos = useMemo<CardType[]>(() => {
    return aiMemos?.filter((memo) => memo.isAiGenerated) ?? [];
  }, [aiMemos]);

  return aiResultMemos.length === 0 ? (
    <EmptyView
      title="저장된 AI 기록이 없습니다."
      description="AI 기록을 생성해보세요."
    />
  ) : (
    <MemoListView
      title="AI 기록"
      initialMemos={aiResultMemos}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={aiResultMemos.length}
    />
  );
};

export default AiResultsPage;
