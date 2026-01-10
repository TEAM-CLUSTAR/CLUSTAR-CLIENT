import * as styles from './hover-label-token.css';

interface HoverLabelTokenProps {
  labelName: string;
}

const HoverLabelToken = ({ labelName }: HoverLabelTokenProps) => {
  return <button className={styles.container}>{labelName}</button>;
};

export default HoverLabelToken;
