import * as styles from './prompt-popover.css';

interface PromptPopoverProps {
  title: string;
  description: string;
}

const PromptPopover = ({ title, description }: PromptPopoverProps) => {
  return (
    <div className={styles.popoverContainer}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default PromptPopover;
