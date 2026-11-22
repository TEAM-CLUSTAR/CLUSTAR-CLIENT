import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as styles from './button.css';

export type ButtonSizeType = 'sm' | 'md';
export type ButtonVariantType = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  icon?: ReactNode;
}

const Button = ({
  size = 'sm',
  variant = 'primary',
  icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button({ size, variant })}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
