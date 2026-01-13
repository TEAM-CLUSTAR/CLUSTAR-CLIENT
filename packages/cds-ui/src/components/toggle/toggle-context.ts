import { createContext } from 'react';

export const ToggleContext = createContext<{
  selectedValue: unknown;
  handleValueChange: (value: unknown) => void;
} | null>(null);
