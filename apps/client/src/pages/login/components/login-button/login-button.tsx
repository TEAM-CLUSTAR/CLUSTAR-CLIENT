import * as styles from './login-button.css';

interface LoginButtonProps {
  onClick: () => void;
}

// @TODO: 추후 공통 버튼 컴포넌트로 교체
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
      <span className={styles.label}>Google로 계속하기</span>
      <span className={styles.spacer} aria-hidden />
    </button>
  );
};

export default LoginButton;
