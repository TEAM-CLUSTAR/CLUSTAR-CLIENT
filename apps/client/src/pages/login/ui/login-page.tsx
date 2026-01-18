import LoginHeader from './login-header';

import * as styles from './login-page.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginHeader />

      <div className={styles.content}>
        <p className={styles.welcome}>반가워요.</p>
        <p className={styles.description}>
          흩어진 메모를 빛나는 결과물로, CLUSTAR
        </p>
        <picture>
          <source srcSet="/login_file.webp" type="image/webp" />
          <img
            src="/login_file.png"
            alt="login pile image"
            className={styles.loginfile}
          />
        </picture>
        <p className={styles.loginSection}>
          <p className={styles.login}>로그인/회원가입</p>
          <div className={styles.loginDeesctiption}>
            계속 진행하면 <a className={styles.point}>이용약관</a> 및
            <a className={styles.point}>개인정보처리방침</a>
            을 이해하고
            <br />
            동의하는 것으로 간주됩니다.
          </div>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
