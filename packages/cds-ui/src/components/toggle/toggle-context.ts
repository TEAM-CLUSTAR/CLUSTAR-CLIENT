import { createContext, useContext } from 'react';

export const ToggleContext = createContext<{
  selectedValue: unknown;
  handleValueChange: (value: unknown) => void;
} | null>(null);

export const useToggleContext = () => {
  const context = useContext(ToggleContext);

  if (!context) {
    throw new Error('Toggle 컴포넌트 내부에서만 사용할 수 있습니다.');
  }

  return context;
};
