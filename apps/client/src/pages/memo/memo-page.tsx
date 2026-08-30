import { PATH } from '@router/path';
import { useNavigate } from 'react-router';

import MemoDetail from '@pages/memo/components/memo-detail/memo-detail';

import * as styles from './memo-page.css';

const NewMemoPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <MemoDetail memoId={null} onDeleted={() => navigate(PATH.MEMOS)} />
    </div>
  );
};

export default NewMemoPage;
