import { MockMemo } from '../../types/memo';
import Header from '../header/header';
import MemoCardGrid from './components/memo-list/memo-card-grid';

import * as styles from './memo-list-view.css';

export interface MemoListViewProps {
  title?: string;
  initialMemos?: MockMemo[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  totalCount: number;
}

const MemoListView = ({
  title = '전체 메모',
  initialMemos,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  totalCount,
}: MemoListViewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <Header title={title} count={totalCount} />
        <MemoCardGrid
          memoData={initialMemos ?? []}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      </div>
    </div>
  );
};

export default MemoListView;
