import { ReactNode } from 'react';

import * as styles from './auth-layout.css';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.background}>{children}</div>;
};

export default AuthLayout;
