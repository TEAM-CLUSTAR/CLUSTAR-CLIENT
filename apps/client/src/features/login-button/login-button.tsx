import { Icon } from '@cds/icon';

import * as styles from './login-button.css';

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      <Icon name="ic_google" width={24} height={24} />
      Google로 시작하기
    </button>
  );
};

export default LoginButton;
