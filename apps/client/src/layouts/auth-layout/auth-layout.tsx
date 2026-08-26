import { ReactNode } from 'react';
import { PATH } from '@router/path';
import { Link } from 'react-router';

import { Icon } from '@cds/icon';

import * as styles from './auth-layout.css';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* 추후 컴포넌트로 교체 */}
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Icon name="ic_logo_symbol" size={42.67} />
          <Icon name="ic_logo_type" width={106.5} height={13.84} />
        </div>
        <Link to={PATH.LOGIN} className={styles.loginLink}>
          로그인
        </Link>
      </header>
      {children}
    </>
  );
};

export default AuthLayout;
