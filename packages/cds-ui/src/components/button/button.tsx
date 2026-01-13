import type { ReactNode } from 'react';

import * as styles from './button.css';

export type ButtonSizeType = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariantType = 'solid' | 'outlined';

export interface ButtonProps {
  children?: ReactNode;
  onClick: () => void;
  size: ButtonSizeType;
  variant?: ButtonVariantType;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  size,
  variant = 'solid',
  disabled = false,
}: ButtonProps) => {
  const applyOutlinedText =
    size === 'md' && variant === 'outlined' && typeof children === 'string';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.button({ size, variant, disabled })}
    >
      {applyOutlinedText ? (
        <span className={styles.outlinedText}>{children}</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
