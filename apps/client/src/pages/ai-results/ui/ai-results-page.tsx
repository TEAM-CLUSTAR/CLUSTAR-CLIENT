import { useMemo } from 'react';

import { MOCK_MEMOS } from '@widgets/memo-list/ui/mock-memos';
import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

const AiResultsPage = () => {
  //TODO: 실제 API 연동 후 수정
  const aiResultMemos = useMemo(() => {
    return MOCK_MEMOS.filter((memo) => memo.aiResult === true);
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
