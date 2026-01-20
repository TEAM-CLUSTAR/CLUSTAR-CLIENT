import { useMemo } from 'react';
import { useParams } from 'react-router';

import { MOCK_MEMOS } from '@widgets/memo-list/ui/mock-memos';
import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

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

  const handleAiCreateClick = (
    memoId: string,
    helpers: MemoListViewHelpers,
  ) => {
    helpers.selectFunction(memoId);
    helpers.setIsAiMode(true);
  };

  return (
    <MemoListView
      title={labelText}
      initialMemos={labeledMemos}
      onAiCreateClick={handleAiCreateClick}
    />
  );
};

export default LabelPage;
