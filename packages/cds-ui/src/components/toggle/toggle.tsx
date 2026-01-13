import {
  Children,
  CSSProperties,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';

import { ToggleContext, useToggleContext } from './toggle-context';

import * as styles from './toggle.css';

interface ToggleProps {
  children: ReactNode;
  selectedValue: string;
  handleValueChange: (value: string) => void;
}

const Toggle = ({
  children,
  selectedValue,
  handleValueChange,
}: ToggleProps) => {
  const activeIndex = useMemo(() => {
    const childrenArray = Children.toArray(children) as ReactElement[];
    return childrenArray.findIndex((child) => {
      const props = child.props as { itemValue?: string } | null | undefined;
      return props && 'itemValue' in props && props.itemValue === selectedValue;
    });
  }, [children, selectedValue]);

  const totalItems = useMemo(() => {
    return Children.count(children);
  }, [children]);

  const contextValue = {
    selectedValue,
    handleValueChange,
  };

  return (
    <ToggleContext.Provider value={contextValue}>
      <div
        className={styles.container}
        style={
          {
            '--active-index': activeIndex,
            '--total-items': totalItems,
          } as CSSProperties
        }
      >
        <div className={styles.slider} />
        {children}
      </div>
    </ToggleContext.Provider>
  );
};

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

Toggle.Item = ToggleItem;

export default Toggle;
