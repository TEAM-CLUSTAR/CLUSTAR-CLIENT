import { forwardRef, type ReactNode } from 'react';

import * as styles from './sidebar-icon.css';

interface SidebarIconProps {
  isSelected?: boolean;
  onClick?: () => void;
  icon: ReactNode;
}

const SidebarIcon = forwardRef<HTMLButtonElement, SidebarIconProps>(
  ({ isSelected, onClick, icon }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={styles.container({ isSelected })}
        onClick={onClick}
      >
        {icon}
      </button>
    );
  },
);

export default SidebarIcon;
