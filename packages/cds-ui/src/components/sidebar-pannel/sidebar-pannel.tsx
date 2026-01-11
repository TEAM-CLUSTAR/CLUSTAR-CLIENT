import type { ReactNode } from 'react';

import { Icon } from '@cds/icon';

import type { IconName } from '../../../../cds-icon/src/icon-list';

import * as styles from './sidebar-pannel.css';

interface SideBarPannelProps {
  children: ReactNode;
  isSelected: boolean;
  iconName: IconName;
  onClick: () => void;
}

const SidebarPannel = ({
  children,
  isSelected,
  iconName,
  onClick,
}: SideBarPannelProps) => {
  const currentState = (isSelected ? `${iconName}_blue` : iconName) as IconName;

  return (
    <button
      type="button"
      className={styles.container({
        state: isSelected ? 'selected' : undefined,
      })}
      aria-selected={isSelected}
      onClick={onClick}
    >
      <Icon name={currentState} width={36} height={36} />
      {children}
    </button>
  );
};

export default SidebarPannel;
