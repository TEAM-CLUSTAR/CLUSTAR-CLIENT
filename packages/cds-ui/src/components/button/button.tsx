import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as styles from './button.css';

export type ButtonSizeType = 'sm' | 'md';
export type ButtonVariantType = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'className'
> {
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  size = 'sm',
  variant = 'primary',
  icon,
  fullWidth = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button({ size, variant, fullWidth })}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
