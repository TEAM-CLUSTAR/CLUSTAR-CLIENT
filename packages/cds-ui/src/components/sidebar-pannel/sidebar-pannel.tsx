import type { ReactNode } from 'react';

import * as styles from './sidebar-pannel.css';

interface SideBarPannelProps {
  children: ReactNode;
  isSelected: boolean;
  onClick?: () => void;
  icon: ReactNode;
}

const SidebarPannel = ({
  children,
  isSelected,
  onClick,
  icon,
}: SideBarPannelProps) => {
  return (
    <button
      type="button"
      className={styles.container({ isSelected })}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};

export default SidebarPannel;
