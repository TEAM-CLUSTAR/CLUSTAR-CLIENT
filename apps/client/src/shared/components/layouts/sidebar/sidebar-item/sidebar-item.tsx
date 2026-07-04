import { ButtonHTMLAttributes } from 'react';

import { Icon, IconName } from '@cds/icon';

import * as styles from './sidebar-item.css';

interface SidebarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: IconName;
  content?: string;
  isSelected?: boolean;
}

const SidebarItem = ({
  iconName,
  content,
  isSelected,
  ...props
}: SidebarItemProps) => {
  return (
    <button
      type="button"
      className={styles.container({ isSelected })}
      {...props}
    >
      <Icon name={iconName} size={32} />
      <span className={styles.text}>{content}</span>
    </button>
  );
};

export default SidebarItem;
