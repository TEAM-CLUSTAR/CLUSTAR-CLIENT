import type { ReactNode } from 'react';

import { Icon } from '@cds/icon';

import type { IconName } from '../../../../cds-icon/src/icon-list'; //@TODO 경로 수정하기

import * as styles from './sidebar-pannel.css';

interface SideBarPannelProps {
  children: ReactNode;
  iconName: IconName;
  onClick: () => void;
}

const SidebarPannel = ({ children, iconName, onClick }: SideBarPannelProps) => {
  return (
    <button className={styles.container} onClick={onClick}>
      <Icon name={iconName} width={36} height={36} />
      {children}
    </button>
  );
};

export default SidebarPannel;
