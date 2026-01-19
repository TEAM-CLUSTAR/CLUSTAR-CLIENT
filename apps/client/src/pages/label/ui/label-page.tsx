import { useMemo } from 'react';
import { useParams } from 'react-router';

import AllMemoPage, {
  type AllMemoPageHelpers,
} from '@pages/all-memo/ui/all-memo-page';

import { MOCK_MEMOS } from '@widgets/memo-list/ui/mock-memos';

const LABEL_ID_TO_TEXT: Record<string, string> = {
  project: '졸업 프로젝트',
  general: '교양',
  sopt: 'SOPT',
  reference: '레퍼런스',
};

const LabelPage = () => {
  const { labelId } = useParams<{ labelId?: string }>();

  const labelText = useMemo(() => {
    return labelId ? LABEL_ID_TO_TEXT[labelId] : undefined;
  }, [labelId]);

  //TODO: 실제 API 연동 후 수정
  const labeledMemos = useMemo(() => {
    if (!labelText) return [];

    return MOCK_MEMOS.filter((memo) =>
      memo.item.some((item) => item.text === labelText),
    );
  }, [labelText]);

  const handleAiCreateClick = (memoId: string, helpers: AllMemoPageHelpers) => {
    helpers.setInitialSelectedId(memoId);
    helpers.setIsAiMode(true);
  };

  return (
    <AllMemoPage
      title={labelText}
      initialMemos={labeledMemos}
      onAiCreateClick={handleAiCreateClick}
    />
  );
};

export default LabelPage;
