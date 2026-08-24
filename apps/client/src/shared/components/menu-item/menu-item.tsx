import { ButtonHTMLAttributes } from 'react';

import { Icon, IconName } from '@cds/icon';

import * as styles from './menu-item.css';

interface MenuItemProps extends Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled'
> {
  iconName: IconName;
  content?: string;
  isSelected?: boolean;
  size?: 'sm' | 'lg';
}

const MenuItem = ({
  iconName,
  content,
  isSelected,
  size = 'lg',
  ...props
}: MenuItemProps) => {
  return (
    <button
      {...props}
      type="button"
      className={styles.container({ isSelected })}
    >
      <Icon name={iconName} size={size === 'lg' ? 32 : 24} />
      {content != null && (
        <span className={styles.text({ size })}>{content}</span>
      )}
    </button>
  );
};

export default MenuItem;
