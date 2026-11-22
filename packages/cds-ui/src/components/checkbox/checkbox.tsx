import type { ComponentPropsWithoutRef } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './checkbox.css';

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'className'
>;

const Checkbox = ({ disabled, ...props }: CheckboxProps) => {
  return (
    <span className={styles.root}>
      <input
        type="checkbox"
        className={styles.box}
        disabled={disabled}
        {...props}
      />
      <Icon
        name="ic_check_regular"
        size={14}
        color={disabled ? 'disabled' : 'inverse'}
        className={styles.mark}
      />
    </span>
  );
};

export default Checkbox;
