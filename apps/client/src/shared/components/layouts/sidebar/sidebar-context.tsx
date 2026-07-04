import { createContext, type ReactNode, useContext, useState } from 'react';

interface SidebarContextValue {
  isExpanded: boolean;
  toggle: () => void;
  setExpanded: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setExpanded] = useState(true);

  const value = {
    isExpanded,
    toggle: () => setExpanded((prev) => !prev),
    setExpanded,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useSidebar는 <SidebarProvider> 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
};
