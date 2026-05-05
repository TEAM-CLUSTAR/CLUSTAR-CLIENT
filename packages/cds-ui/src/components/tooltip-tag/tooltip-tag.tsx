import * as styles from './tooltip-tag.css';

interface TooltipTagProps {
  children: string;
}

const TooltipTag = ({ children }: TooltipTagProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default TooltipTag;
