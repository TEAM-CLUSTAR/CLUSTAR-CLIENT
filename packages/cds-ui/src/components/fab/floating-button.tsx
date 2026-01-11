import { Icon } from '@cds/icon';

import * as styles from './floating-button.css';

interface FabProps {
  children: string;
  isActive: boolean;
  handleClick: () => void;
}

const Fab = ({ isActive, handleClick, children }: FabProps) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.button({ isActive })}
    >
      <Icon name="ic_ai_white" width={36} height={36} />
      <span>{children}</span>
    </button>
  );
};

export default Fab;
