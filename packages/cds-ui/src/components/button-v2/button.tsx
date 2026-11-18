import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as styles from './button.css';

export type ButtonSizeType = 'sm' | 'md';
export type ButtonVariantType = 'primary' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  icon?: ReactNode;
}

// TODO: Figma loading 상태(스피너)는 사용처가 생기면 추가....
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
