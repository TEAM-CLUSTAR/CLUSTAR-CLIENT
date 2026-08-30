import { useParams } from 'react-router';

import MemoDetail, {
  type MemoEditTarget,
} from '@pages/memo/components/memo-detail/memo-detail';

import * as styles from './memo-page.css';

const MemoPage = () => {
  const { memoId } = useParams();

  const selectedMemoId = memoId === undefined ? null : Number(memoId);
  const target: MemoEditTarget =
    selectedMemoId === null
      ? { status: 'new', memoId: null }
      : { status: 'saved', memoId: selectedMemoId };

  return (
    <div className={styles.pageContainer}>
      <MemoDetail key={selectedMemoId ?? 'new'} target={target} />
    </div>
  );
};

export default MemoPage;
