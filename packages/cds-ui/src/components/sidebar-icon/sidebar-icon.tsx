import type { ReactNode } from 'react';

import * as styles from './sidebar-icon.css';

interface SidebarIconProps {
  isSelected: boolean;
  onClick: () => void;
  icon: ReactNode;
}

const SidebarIcon = ({ isSelected, onClick, icon }: SidebarIconProps) => {
  return (
    <button
      type="button"
      className={styles.container({ isSelected })}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default SidebarIcon;
