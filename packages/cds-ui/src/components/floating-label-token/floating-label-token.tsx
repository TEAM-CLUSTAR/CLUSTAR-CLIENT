import * as styles from './floating-label-token.css';

interface FloatingLabelTokenProps {
  children: string;
}

const FloatingLabelToken = ({ children }: FloatingLabelTokenProps) => {
  return (
    <button type="button" className={styles.container}>
      {children}
    </button>
  );
};

export default FloatingLabelToken;
