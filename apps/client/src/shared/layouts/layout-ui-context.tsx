import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface LayoutUIContextValue {
  // 사이드바 UI 상태
  isExpanded: boolean;
  toggleSidebar: () => void;
  sidebarLocked: boolean;
  setSidebarLocked: (locked: boolean) => void;
  // AI 모드 상태
  isAiMode: boolean;
  setIsAiMode: Dispatch<SetStateAction<boolean>>;
  isPromptOpen: boolean;
  setIsPromptOpen: Dispatch<SetStateAction<boolean>>;
}

const LayoutUIContext = createContext<LayoutUIContextValue | null>(null);

export const LayoutUIProvider = ({ children }: PropsWithChildren) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const prevExpandedStateRef = useRef<boolean>(true);

  // isPromptOpen에 따라 사이드바 자동 닫기/열기
  useEffect(() => {
    if (isPromptOpen) {
      // 프롬프트가 열릴 때 사이드바가 열려있으면 닫고 이전 상태 저장
      setIsExpanded((prev) => {
        if (prev) {
          prevExpandedStateRef.current = prev;
          return false;
        }
        return prev;
      });
    } else {
      // 프롬프트가 닫히면 이전 상태로 복원
      setIsExpanded(prevExpandedStateRef.current);
    }
  }, [isPromptOpen]);

  const toggleSidebar = () => {
    if (isPromptOpen) return;
    setIsExpanded((prev) => !prev);
  };

  return (
    <LayoutUIContext.Provider
      value={{
        isExpanded,
        toggleSidebar,
        sidebarLocked,
        setSidebarLocked,
        isAiMode,
        setIsAiMode,
        isPromptOpen,
        setIsPromptOpen,
      }}
    >
      {children}
    </LayoutUIContext.Provider>
  );
};

export const useLayoutUI = () => {
  const ctx = useContext(LayoutUIContext);
  if (!ctx) {
    throw new Error('useLayoutUI must be used inside LayoutUIProvider');
  }
  return ctx;
};
