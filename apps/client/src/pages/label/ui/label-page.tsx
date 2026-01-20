import { useMemo } from 'react';
import { useParams } from 'react-router';

import { type MockMemo } from '@widgets/memo-list/types/memo';
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

  //TODO: 실제 API 연동 후 라벨별 메모 리스트 API 사용
  const labeledMemos = useMemo<MockMemo[]>(() => {
    if (!labelText) return [];
    return [];
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
