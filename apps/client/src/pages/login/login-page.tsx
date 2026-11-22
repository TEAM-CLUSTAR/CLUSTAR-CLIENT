import { LOGIN_END_POINT } from '@pages/login/apis/end-point';
import LoginButton from '@pages/login/components/login-button/login-button';

import { appConfig } from '@shared/configs/app-config';

import Footer from './components/footer/footer';

import * as styles from './login-page.css';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    const loginUrl = `${appConfig.api.baseUrl}${LOGIN_END_POINT.LOGIN}`;
    window.location.href = loginUrl;
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.stage}>
          <img
            src="/login/connector-l.svg"
            alt=""
            aria-hidden
            className={styles.connectorL}
          />
          <img
            src="/login/connector-r.svg"
            alt=""
            aria-hidden
            className={styles.connectorR}
          />
          <img
            src="/login/memo-l.svg"
            alt=""
            aria-hidden
            className={styles.memoL}
          />
          <img
            src="/login/memo-r.svg"
            alt=""
            aria-hidden
            className={styles.memoR}
          />
          <img
            src="/login/folder-back.svg"
            alt=""
            aria-hidden
            className={styles.folderBack}
          />

          <section className={styles.loginSection}>
            <div className={styles.titleDescriptionContainer}>
              <h1 className={styles.title}>CLUSTAR에 로그인</h1>
              <p className={styles.description}>
                흩어진 메모를 모아 빛나는 결과물로
              </p>
            </div>
            <LoginButton onClick={handleGoogleLogin} />
            <p className={styles.infoText}>
              계속 진행하면 <span className={styles.infoLink}>이용약관</span> 및{' '}
              <span className={styles.infoLink}>개인정보처리방침</span>을
              <br />
              이해하고 동의하는 것으로 간주됩니다.
            </p>
          </section>

          <img
            src="/login/port.svg"
            alt=""
            aria-hidden
            className={styles.portMemoL}
          />
          <img
            src="/login/port.svg"
            alt=""
            aria-hidden
            className={styles.portLoginSection}
          />
          <img
            src="/login/port.svg"
            alt=""
            aria-hidden
            className={styles.portMemoR}
          />
          <img
            src="/login/spark-lg.svg"
            alt=""
            aria-hidden
            className={styles.sparkLg}
          />
          <img
            src="/login/spark-sm.svg"
            alt=""
            aria-hidden
            className={styles.sparkSm}
          />
          <img
            src="/login/folder-front.svg"
            alt=""
            aria-hidden
            className={styles.folderFront}
          />
          <img
            src="/login/folder-lines.svg"
            alt=""
            aria-hidden
            className={styles.folderLines}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
