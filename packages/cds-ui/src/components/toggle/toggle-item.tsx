import { ReactNode } from 'react';

import { useToggleContext } from './toggle-context';

import * as styles from './toggle.css';

interface ToggleItemProps<T> {
  itemValue: T;
  children: ReactNode;
}

const ToggleItem = <T,>({ itemValue, children }: ToggleItemProps<T>) => {
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
