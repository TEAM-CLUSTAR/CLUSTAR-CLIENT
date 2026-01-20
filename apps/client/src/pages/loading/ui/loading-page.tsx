import * as styles from './loading-page.css';

import logoImage from '/clustar_logo.svg';

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <img src={logoImage} alt="로고" className={styles.logo} aria-hidden />
      </div>
    </div>
  );
};

export default LoadingPage;
