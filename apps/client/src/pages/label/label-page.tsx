import { useMemo } from 'react';
import { useParams } from 'react-router';

import {
  useGetAllMemo,
  useGetLabel,
  useGetMemoTotalCount,
} from '@pages/all-memo/apis/queries';

import MemoListView from '@shared/components/memo-list-view/memo-list-view';

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

  return (
    <MemoListView
      title={labelMeta?.text}
      initialMemos={labeledMemos}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={totalCount ?? 0}
    />
  );
};

export default LabelPage;
