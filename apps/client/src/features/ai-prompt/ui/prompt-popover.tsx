import * as styles from './prompt-popover.css';

interface PromptPopoverProps {
  title: string;
  description: string;
}

const PromptPopover = ({ title, description }: PromptPopoverProps) => {
  return (
    <div className={styles.popoverContainer}>
      <strong className={styles.title}>{title}</strong>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default PromptPopover;
