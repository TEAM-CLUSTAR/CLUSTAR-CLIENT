import {
  MemoListView,
  type MemoListViewHelpers,
} from '@widgets/memo-list-view';

const AllMemoPage = () => {
  const handleAiCreateClick = (
    memoId: string,
    helpers: MemoListViewHelpers,
  ) => {
    helpers.selectFunction(memoId);
    helpers.setIsAiMode(true);
  };

  return (
    <MemoListView title="전체 메모" onAiCreateClick={handleAiCreateClick} />
  );
};

export default AllMemoPage;
