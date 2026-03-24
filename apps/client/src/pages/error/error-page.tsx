import * as styles from './error-page.css';

import errorImage from '/error.svg';

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <img src={errorImage} alt="error page" />
      <div className={styles.textContainer}>
        <p className={styles.errorTitle}>앗, 문제가 발생했어요!</p>
        <p className={styles.errorText}>잠시 후에 다시 시도해주세요. </p>
      </div>
    </div>
  );
};

export default ErrorPage;
