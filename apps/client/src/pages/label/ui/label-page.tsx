import { useMemo } from 'react';
import { useParams } from 'react-router';

import {
  useGetAllMemo,
  useGetMemoTotalCount,
} from '@pages/all-memo/api/queries';

import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

const LABEL_META: Record<
  string,
  {
    id: number;
    text: string;
  }
> = {
  project: { id: 1, text: '졸업 프로젝트' },
  general: { id: 2, text: '교양' },
  sopt: { id: 3, text: 'SOPT' },
  reference: { id: 4, text: '레퍼런스' },
};

const LabelPage = () => {
  const { labelId } = useParams<{ labelId?: string }>();

  const labelMeta = useMemo(() => {
    if (!labelId) return undefined;
    return LABEL_META[labelId];
  }, [labelId]);

  const {
    data: labeledMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllMemo(labelMeta ? [labelMeta.id] : undefined);

  const { data: totalCount } = useGetMemoTotalCount(
    labelMeta ? [labelMeta.id] : undefined,
  );

  const handleAiCreateClick = (
    memoId: string,
    helpers: MemoListViewHelpers,
  ) => {
    helpers.selectFunction(memoId);
    helpers.setIsAiMode(true);
  };

  return (
    <MemoListView
      title={labelMeta?.text}
      initialMemos={labeledMemos}
      onAiCreateClick={handleAiCreateClick}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={totalCount}
    />
  );
};

export default LabelPage;
