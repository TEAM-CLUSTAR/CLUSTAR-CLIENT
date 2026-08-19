import { ButtonHTMLAttributes } from 'react';

import { Icon, IconName } from '@cds/icon';

import * as styles from './nav-item.css';

interface NavItemProps extends Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled'
> {
  iconName: IconName;
  content?: string;
  isSelected?: boolean;
  type?: 'sm' | 'lg';
}

const NavItem = ({
  iconName,
  content,
  isSelected,
  type = 'lg',
  ...props
}: NavItemProps) => {
  return (
    <button
      {...props}
      type="button"
      className={styles.container({ isSelected })}
    >
      <Icon name={iconName} size={type === 'lg' ? 32 : 24} />
      {content != null && (
        <span className={styles.text({ type })}>{content}</span>
      )}
    </button>
  );
};

export default NavItem;
