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
import { useLocation } from 'react-router';

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
  chatRoomId: number | null;
  setChatRoomId: Dispatch<SetStateAction<number | null>>;
  // 트리뷰 상태
  isTreeViewOpen: boolean;
  setIsTreeViewOpen: Dispatch<SetStateAction<boolean>>;
}

const LayoutUIContext = createContext<LayoutUIContextValue | null>(null);

export const LayoutUIProvider = ({ children }: PropsWithChildren) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const [isTreeViewOpen, setIsTreeViewOpen] = useState(false);
  const prevExpandedStateRef = useRef<boolean>(true);
  const location = useLocation();
  const prevPathnameRef = useRef<string>(location.pathname);

  // 페이지 이동 시 AI 모드 상태 초기화 (AI prompt가 열려있지 않을 때만)
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      if (!isPromptOpen) {
        setIsAiMode(false);
        setIsPromptOpen(false);
        setIsTreeViewOpen(false);
      }
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname, isPromptOpen]);

  // isPromptOpen에 따라 사이드바 자동 닫기/열기
  useEffect(() => {
    if (isPromptOpen || isTreeViewOpen) {
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
  }, [isPromptOpen, isTreeViewOpen]);

  const toggleSidebar = () => {
    if (isPromptOpen) return;
    if (isTreeViewOpen) return;
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
        chatRoomId,
        setChatRoomId,
        isTreeViewOpen,
        setIsTreeViewOpen,
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
