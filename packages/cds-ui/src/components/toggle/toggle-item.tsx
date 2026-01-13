import { ReactNode } from 'react';

import { useToggleContext } from './toggle-context';

import * as styles from './toggle.css';

interface ToggleItemProps {
  itemValue: string;
  children: ReactNode;
}

const ToggleItem = ({ itemValue, children }: ToggleItemProps) => {
  const { selectedValue, handleValueChange } = useToggleContext();

  const isActive = selectedValue === itemValue;

  return (
    <button
      type="button"
      onClick={() => handleValueChange(itemValue)}
      className={styles.item({ active: isActive })}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
};

export default ToggleItem;
