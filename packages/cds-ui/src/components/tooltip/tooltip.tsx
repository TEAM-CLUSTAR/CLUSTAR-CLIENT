import * as styles from './tooltip.css';

interface TooltipProps {
  title: string;
  description?: string;
}
const Tooltip = ({ title, description }: TooltipProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
};
export default Tooltip;
