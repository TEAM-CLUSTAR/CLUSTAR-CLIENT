import { forwardRef, type ReactNode } from 'react';

import * as styles from './sidebar-pannel.css';

interface SideBarPannelProps {
  children: ReactNode;
  isSelected: boolean;
  onClick?: () => void;
  icon: ReactNode;
}

const SidebarPannel = forwardRef<HTMLButtonElement, SideBarPannelProps>(
  ({ children, isSelected, onClick, icon }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={styles.container({ isSelected })}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    );
  },
);

export default SidebarPannel;
