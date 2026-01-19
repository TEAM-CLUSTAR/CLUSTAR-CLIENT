import { Icon } from '@cds/icon';

import * as styles from './floating-button.css';

interface FloatingButtonProps {
  children: string;
  isActive: boolean;
  disabled?: boolean;
  handleClick: () => void;
}

const FloatingButton = ({
  isActive,
  disabled,
  handleClick,
  children,
}: FloatingButtonProps) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.button({ isActive, disabled })}
    >
      <Icon name="ic_ai_white" width={36} height={36} />
      <span>{children}</span>
    </button>
  );
};

export default FloatingButton;
