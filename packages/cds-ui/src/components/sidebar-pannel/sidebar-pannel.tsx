import type { ReactNode } from 'react';

import { Icon } from '@cds/icon';

import type { IconName } from '../../../../cds-icon/src/icon-list';

import * as styles from './sidebar-pannel.css';

interface SideBarPannelProps {
  children: ReactNode;
  isSelected: boolean;
  iconName: string;
  onClick: () => void;
}

const SidebarPannel = ({
  children,
  isSelected,
  iconName,
  onClick,
}: SideBarPannelProps) => {
  const currentState = isSelected ? 'selected' : undefined;

  return (
    <button
      className={styles.container({ state: currentState })}
      onClick={onClick}
    >
      <Icon
        name={(isSelected ? `${iconName}_blue` : iconName) as IconName}
        width={36}
        height={36}
      />
      {children}
    </button>
  );
};

export default SidebarPannel;
