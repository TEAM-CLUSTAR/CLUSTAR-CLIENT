import { useMemo } from 'react';
import { useParams } from 'react-router';

import {
  useGetAllMemo,
  useGetMemoTotalCount,
  useGetTag,
} from '@pages/all-memo/apis/queries';

import MemoListView from '@shared/components/memo-list-view/memo-list-view';

const TagPage = () => {
  const { tagId } = useParams<{ tagId?: string }>();
  const { data: tags = [] } = useGetTag();

  const tagMeta = useMemo(() => {
    if (!tagId) return undefined;

    const numericTagId = Number(tagId);
    if (isNaN(numericTagId)) return undefined;

    const tag = tags.find((t) => t.tagId === numericTagId);
    if (!tag) return undefined;

    return {
      id: tag.tagId ?? 0,
      text: tag.name ?? '',
    };
  }, [tagId, tags]);

  const {
    data: taggedMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllMemo(tagMeta ? [tagMeta.id] : undefined);

  const { data: totalCount } = useGetMemoTotalCount(
    tagMeta ? [tagMeta.id] : undefined,
  );

  return (
    <MemoListView
      title={tagMeta?.text}
      initialMemos={taggedMemos}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={totalCount ?? 0}
    />
  );
};

export default TagPage;
