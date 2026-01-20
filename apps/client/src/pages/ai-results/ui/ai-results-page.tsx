import { useMemo } from 'react';

import { type MockMemo } from '@widgets/memo-list/types/memo';
import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

const AiResultsPage = () => {
  //TODO: 실제 API 연동 후 수정
  const aiResultMemos = useMemo<MockMemo[]>(() => {
    // TODO: API 연동 시 AI 결과 메모 목록으로 교체
    return [];
  }, []);

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
    />
  );
};

export default AiResultsPage;
