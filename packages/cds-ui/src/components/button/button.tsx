import type { ReactNode } from 'react';

import * as styles from './button.css';

export type ButtonSizeType = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariantType = 'solid' | 'outlined';
export type ButtonTextSizeType = 'sm' | 'lg';
export interface ButtonProps {
  children?: ReactNode;
  onClick: () => void;
  size: ButtonSizeType;
  variant?: ButtonVariantType;
  disabled?: boolean;
  textSize?: ButtonTextSizeType;
}

const Button = ({
  children,
  onClick,
  size,
  variant = 'solid',
  disabled = false,
  textSize,
}: ButtonProps) => {
  const applyOutlinedText =
    size === 'md' && variant === 'outlined' && typeof children === 'string';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.button({ size, variant, disabled, textSize })}
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
