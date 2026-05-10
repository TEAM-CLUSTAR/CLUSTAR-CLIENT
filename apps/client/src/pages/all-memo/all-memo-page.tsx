import { PATH } from '@router/path';
import { useNavigate } from 'react-router';

import EmptyView from '@shared/components/empty-view/empty-view';
import MemoListView from '@shared/components/memo-list-view/memo-list-view';

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

  const navigate = useNavigate();

  return totalCount === 0 ? (
    <EmptyView
      imgSrc={emptyImage}
      title="작성된 메모가 없습니다."
      description="새 메모 창에 들어가서 새로운 메모를 생성해보세요."
      buttonText="메모 작성하러 가기"
      onButtonClick={() => navigate(PATH.NEW_MEMO)}
    />
  ) : (
    <MemoListView
      title="전체 메모"
      initialMemos={filteredMemos}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      totalCount={totalCount ?? 0}
    />
  );
};

export default AllMemoPage;
