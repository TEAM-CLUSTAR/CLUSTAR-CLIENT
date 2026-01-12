import type { ReactNode } from 'react';

import * as styles from './sidebar-icon.css';

interface SideBarPannelProps {
  isSelected: boolean;
  onClick: () => void;
  icon: ReactNode;
}

const SidebarIcon = ({ isSelected, onClick, icon }: SideBarPannelProps) => {
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
