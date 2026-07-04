import { ButtonHTMLAttributes } from 'react';

import { Icon, IconName } from '@cds/icon';

import * as styles from './sidebar-item.css';

interface SidebarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: IconName;
  itemText?: string;
  isSelected?: boolean;
}

const SidebarItem = ({
  iconName,
  itemText,
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
      <span className={styles.text}>{itemText}</span>
    </button>
  );
};

export default SidebarItem;
