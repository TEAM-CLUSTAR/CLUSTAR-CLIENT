import { PATH } from '@router/path';

import EmptyView from '@shared/components/empty-view/empty-view';
import {
  MemoListView,
  MemoListViewHelpers,
} from '@shared/components/memo-list-view';

import { useGetAllMemo, useGetMemoTotalCount } from './apis/queries';

import emptyImage from '/empty.svg';

const AllMemoPage = () => {
  const {
    data: filteredMemos,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllMemo();

  const { data: totalCount } = useGetMemoTotalCount();

  const handleAiCreateClick = (
    memoId: string,
    helpers: MemoListViewHelpers,
  ) => {
    helpers.selectFunction(memoId);
    helpers.setIsAiMode(true);
  };

  return totalCount === 0 ? (
    <EmptyView
      imgSrc={emptyImage}
      title="작성된 메모가 없습니다."
      description="새 메모 창에 들어가서 새로운 메모를 생성해보세요."
      buttonText="메모 작성하러 가기"
      buttonPath={PATH.NEW_MEMO}
    />
  ) : (
    <MemoListView
      title="전체 메모"
      onAiCreateClick={handleAiCreateClick}
      initialMemos={filteredMemos}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={totalCount}
    />
  );
};

export default AllMemoPage;
