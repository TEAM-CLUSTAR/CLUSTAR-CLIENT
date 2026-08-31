import { createContext, type ReactNode, useContext, useState } from 'react';

interface SidebarContextValue {
  isExpanded: boolean;
  toggleSidebar: () => void;
  expand: () => void;
}

const SIDEBAR_EXPANDED_KEY = 'sidebarExpanded';

const getStoredIsExpanded = () =>
  localStorage.getItem(SIDEBAR_EXPANDED_KEY) !== 'false';

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setExpanded] = useState(getStoredIsExpanded);

  const updateExpanded = (nextIsExpanded: boolean) => {
    localStorage.setItem(SIDEBAR_EXPANDED_KEY, String(nextIsExpanded));
    setExpanded(nextIsExpanded);
  };

  const value = {
    isExpanded,
    toggleSidebar: () => updateExpanded(!isExpanded),
    expand: () => updateExpanded(true),
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
