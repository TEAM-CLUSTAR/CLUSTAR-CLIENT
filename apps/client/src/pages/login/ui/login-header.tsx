import { Icon } from '@cds/icon';

import * as styles from './login-header.css';

const LoginHeader = () => {
  return (
    <div className={styles.header}>
      <Icon name="ic_logo_symbol" width={44} height={44} />
      <Icon name="ic_logo_type" width={108} height={14} />
    </div>
  );
};

export default LoginHeader;
