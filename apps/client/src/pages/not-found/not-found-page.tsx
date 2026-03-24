import { useNavigate } from 'react-router';

import { Button } from '@cds/ui';

import { PATH } from '@shared/router/path';

import * as styles from './not-found-page.css';

import notFoundImage from '/not_found.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.contentsContainer}>
        <p className={styles.errorText}>HTTP ERROR 404</p>
        <img src={notFoundImage} alt="404 not found" />
        <div className={styles.textContainer}>
          <p className={styles.errorTitle}>앗, 페이지를 찾을 수 없어요!</p>
          <p className={styles.errorText}>
            메인화면으로 돌아가거나, 주소가 맞는지 다시 한 번 확인해 주세요!
          </p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button size="lg" onClick={() => navigate(PATH.NEW_MEMO)}>
          메인화면
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
