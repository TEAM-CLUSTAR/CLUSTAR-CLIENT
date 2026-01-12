import * as styles from './hover-label-token.css';

interface HoverLabelTokenProps {
  children: string;
}

const HoverLabelToken = ({ children }: HoverLabelTokenProps) => {
  return (
    <button type="button" className={styles.container}>
      {children}
    </button>
  );
};

export default HoverLabelToken;
