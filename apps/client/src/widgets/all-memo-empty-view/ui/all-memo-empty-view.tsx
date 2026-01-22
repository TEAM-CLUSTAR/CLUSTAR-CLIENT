import { useNavigate } from 'react-router';

import { Button } from '@cds/ui';

import { PATH } from '@shared/router/path';

import * as styles from './all-memo-empty-view.css';

import emptyImage from '/empty.svg';

const AllMemoEmptyView = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={emptyImage} alt="empty image" />
      <p className={styles.emptyTitle}>작성된 메모가 없습니다.</p>
      <p className={styles.description}>
        새 메모 창에 들어가서 새로운 메모를 생성해보세요.
      </p>
      <div className={styles.buttonContainer}>
        <Button size="lg" onClick={() => navigate(PATH.NEW_MEMO)}>
          메모 작성하러 가기
        </Button>
      </div>
    </div>
  );
};

export default AllMemoEmptyView;
