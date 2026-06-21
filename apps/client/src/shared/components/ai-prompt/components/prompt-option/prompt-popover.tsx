import { Tooltip } from '@cds/ui';

import * as styles from './prompt-popover.css';

interface PromptPopoverProps {
  title: string;
  description: string;
}

const PromptPopover = ({ title, description }: PromptPopoverProps) => {
  return (
    <Tooltip>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </Tooltip>
  );
};

export default PromptPopover;
