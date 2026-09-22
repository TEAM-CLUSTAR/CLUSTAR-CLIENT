import { ButtonHTMLAttributes } from 'react';

import { Icon, IconName } from '@cds/icon';

import * as styles from './menu-item.css';

interface MenuItemProps extends Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'disabled'
> {
  'data-state'?: 'open' | 'closed';
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
        <span className={styles.text({ size, isSelected })}>{content}</span>
      )}
      {props['data-state'] !== undefined && (
        <div className={styles.chevronContainer}>
          <Icon
            name="ic_chevron_down"
            size={20}
            color="grey500"
            className={styles.chevron}
          />
        </div>
      )}
    </button>
  );
};

export default MenuItem;
