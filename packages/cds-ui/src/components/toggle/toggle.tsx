import { ReactNode } from 'react';

import { ToggleContext } from './toggle.context';

import * as styles from './toggle.css';

interface ToggleProps<ToggleValue> {
  children: ReactNode;
  selectedValue: ToggleValue;
  handleValueChange: (value: ToggleValue) => void;
}

const Toggle = <ToggleValue,>({
  children,
  selectedValue,
  handleValueChange,
}: ToggleProps<ToggleValue>) => {
  return (
    <ToggleContext.Provider
      value={
        {
          selectedValue,
          handleValueChange,
        } as {
          selectedValue: unknown;
          handleValueChange: (value: unknown) => void;
        }
      }
    >
      <div className={styles.container}>{children}</div>
    </ToggleContext.Provider>
  );
};

export default Toggle;
