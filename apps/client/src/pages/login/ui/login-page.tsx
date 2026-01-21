import { Navigate } from 'react-router';

import { Icon } from '@cds/icon';

import { PATH } from '@shared/router/path';
import { getAccessToken } from '@shared/storage/token-storage';

import LoginButton from '@features/login-button/ui/login-button';

import { LOGIN_END_POINT } from '@widgets/login-page/api/end-point';

import * as styles from './login-page.css';

const LoginPage = () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    return <Navigate to={PATH.NEW_MEMO} replace />;
  }

  const handleGoogleLogin = () => {
    const loginUrl = `${import.meta.env.VITE_API_BASE_URL}${LOGIN_END_POINT.LOGIN}`;
    window.location.href = loginUrl;
  };

  return (
    <>
      <div className={styles.header}>
        <Icon name="ic_logo_symbol" width={44} height={44} />
        <Icon name="ic_logo_type" width={108} height={14} />
      </div>

      <div className={styles.content}>
        <p className={styles.welcome}>반가워요.</p>
        <p className={styles.description}>
          흩어진 메모를 빛나는 결과물로, CLUSTAR
        </p>

        <picture>
          <source srcSet="/login_file.webp" type="image/webp" />
          <img
            src="/login_file.png"
            alt="login file image"
            className={styles.loginfile}
          />
        </picture>

        <div className={styles.loginSection}>
          <p className={styles.login}>로그인/회원가입</p>
          <LoginButton onClick={handleGoogleLogin} />
          <p className={styles.loginDescription}>
            계속 진행하면 <a className={styles.point}>이용약관</a> 및
            <a className={styles.point}> 개인정보처리방침</a>
            을 이해하고
            <br />
            동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
