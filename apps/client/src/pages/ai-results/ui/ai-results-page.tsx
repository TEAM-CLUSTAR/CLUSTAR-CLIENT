import { useMemo } from 'react';

import AllMemoPage, {
  type AllMemoPageHelpers,
} from '@pages/all-memo/ui/all-memo-page';

import { MOCK_MEMOS } from '@widgets/memo-list/ui/mock-memos';

const AiResultsPage = () => {
  //TODO: 실제 API 연동 후 수정
  const aiResultMemos = useMemo(() => {
    return MOCK_MEMOS.filter((memo) => memo.aiResult === true);
  }, []);

  const handleAiCreateClick = (memoId: string, helpers: AllMemoPageHelpers) => {
    helpers.setInitialSelectedId(memoId);
    helpers.setIsAiMode(true);
  };

  return (
    <AllMemoPage
      title="AI 결과물"
      initialMemos={aiResultMemos}
      onAiCreateClick={handleAiCreateClick}
    />
  );
};

export default AiResultsPage;
