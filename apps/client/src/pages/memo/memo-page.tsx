import { PATH } from '@router/path';
import { useNavigate } from 'react-router';

import MemoEditor from '@shared/components/memo-editor/memo-editor';

import * as styles from './memo-page.css';

const NewMemoPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <MemoEditor memoId={null} onDeleted={() => navigate(PATH.MEMOS)} />
    </div>
  );
};

export default NewMemoPage;
