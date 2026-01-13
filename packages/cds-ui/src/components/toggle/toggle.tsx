import { Children, ReactElement, ReactNode, useMemo } from 'react';

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
  const activeIndex = useMemo(() => {
    const childrenArray = Children.toArray(children) as ReactElement[];
    return childrenArray.findIndex((child) => {
      const props = child.props as { itemValue?: unknown } | null | undefined;
      return props && 'itemValue' in props && props.itemValue === selectedValue;
    });
  }, [children, selectedValue]);

  const totalItems = useMemo(() => {
    return Children.count(children);
  }, [children]);

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
      <div
        className={styles.container}
        style={
          {
            '--active-index': activeIndex,
            '--total-items': totalItems,
          } as React.CSSProperties
        }
      >
        <div className={styles.slider} />
        {children}
      </div>
    </ToggleContext.Provider>
  );
};

export default Toggle;
