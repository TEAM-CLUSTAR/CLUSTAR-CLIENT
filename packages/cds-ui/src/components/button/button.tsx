import type { ReactNode } from 'react';

import { Icon } from '@cds/icon';

import * as styles from './button.css';

export type ButtonSizeType = 'sm' | 'md' | 'lg';
export type ButtonVariantType = 'solid' | 'outlined';

export interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
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
  const renderContent = () => {
    if (size === 'sm') return <Icon name="ic_send" />;
    if (size === 'md' && variant === 'outlined') {
      return <span className={styles.outlinedText}>{children}</span>;
    }
    return children;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={size === 'sm' && disabled}
      className={styles.button({ size, variant, disabled })}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
