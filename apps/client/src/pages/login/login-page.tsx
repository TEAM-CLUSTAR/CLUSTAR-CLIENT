import { Button } from '@cds/ui';

import { LOGIN_END_POINT } from '@pages/login/apis/end-point';

import { appConfig } from '@shared/configs/app-config';

import Footer from './components/footer/footer';
import Illustration from './components/illustration/illustration';

import * as styles from './login-page.css';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    const loginUrl = `${appConfig.api.baseUrl}${LOGIN_END_POINT.LOGIN}`;
    window.location.href = loginUrl;
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Illustration>
          <section className={styles.loginSection}>
            <div className={styles.titleDescriptionContainer}>
              <h1 className={styles.title}>CLUSTAR에 로그인</h1>
              <p className={styles.description}>
                흩어진 메모를 모아 빛나는 결과물로
              </p>
            </div>
            <Button
              onClick={handleGoogleLogin}
              variant="secondary"
              size="md"
              fullWidth
              icon={
                <img
                  src="/google_logo.png"
                  alt="Google Logo"
                  className={styles.googleLogo}
                />
              }
            >
              Google로 계속하기
            </Button>
            <p className={styles.infoText}>
              계속 진행하면 <span className={styles.infoLink}>이용약관</span> 및{' '}
              <span className={styles.infoLink}>개인정보처리방침</span>을
              <br />
              이해하고 동의하는 것으로 간주됩니다.
            </p>
          </section>
        </Illustration>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
