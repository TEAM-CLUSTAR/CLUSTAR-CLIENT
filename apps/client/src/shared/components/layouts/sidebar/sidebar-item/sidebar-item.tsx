import { ButtonHTMLAttributes } from 'react';

import { Icon, IconName } from '@cds/icon';

import * as styles from './sidebar-item.css';

interface SidebarItemProps extends Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled'
> {
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
      {...props}
      type="button"
      className={styles.container({ isSelected })}
    >
      <Icon name={iconName} size={32} />
      {content != null && <span className={styles.text}>{content}</span>}
    </button>
  );
};

export default SidebarItem;
