import * as styles from './login-button.css';

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      <picture>
        <source srcSet="/google_logo.webp" type="image/webp" />
        <img
          src="/google_logo.png"
          alt="Google Logo"
          className={styles.googleLogo}
        />
      </picture>
      Google로 시작하기
    </button>
  );
};

export default LoginButton;
