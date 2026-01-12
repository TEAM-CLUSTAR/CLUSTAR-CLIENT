import { ReactNode, useContext } from 'react';

import { ToggleContext } from './toggle.context';

import * as styles from './toggle.css';

interface ToggleItemProps<ToggleValue> {
  itemValue: ToggleValue;
  children: ReactNode;
}

const ToggleItem = <ToggleValue,>({
  itemValue,
  children,
}: ToggleItemProps<ToggleValue>) => {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error('Toggle.Item은 Toggle 내부에서만 사용할 수 있습니다.');
  }

  const { selectedValue, handleValueChange } = context;

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
