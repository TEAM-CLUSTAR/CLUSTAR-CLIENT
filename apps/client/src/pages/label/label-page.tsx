import { useMemo } from 'react';
import { useParams } from 'react-router';

import {
  useGetAllMemo,
  useGetLabel,
  useGetMemoTotalCount,
} from '@pages/all-memo/api/queries';

import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

const LabelPage = () => {
  const { labelId } = useParams<{ labelId?: string }>();
  const { data: labels = [] } = useGetLabel();

  const labelMeta = useMemo(() => {
    if (!labelId) return undefined;

    const numericLabelId = Number(labelId);
    if (isNaN(numericLabelId)) return undefined;

    const label = labels.find((l) => l.labelId === numericLabelId);
    if (!label) return undefined;

    return {
      id: label.labelId ?? 0,
      text: label.name ?? '',
    };
  }, [labelId, labels]);

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
