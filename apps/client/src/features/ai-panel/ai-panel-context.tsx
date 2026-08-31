import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { SelectedMemoType } from './types/ai-panel.types';

interface OpenAiPanelOptions {
  selectedMemos?: SelectedMemoType[];
}

interface AiPanelContextValue {
  isOpen: boolean;
  selectedMemos: SelectedMemoType[];
  open: (options?: OpenAiPanelOptions) => void;
  close: () => void;
  toggle: () => void;
  addMemo: (memo: SelectedMemoType) => void;
  removeMemo: (memoId: number) => void;
  clearMemos: () => void;
}

const AiPanelContext = createContext<AiPanelContextValue | null>(null);

export const AiPanelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMemos, setSelectedMemos] = useState<SelectedMemoType[]>([]);

  const open = useCallback((options?: OpenAiPanelOptions) => {
    if (options?.selectedMemos) {
      setSelectedMemos(options.selectedMemos);
    }

    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const addMemo = useCallback((memo: SelectedMemoType) => {
    setSelectedMemos((prev) => {
      if (prev.some((selectedMemo) => selectedMemo.memoId === memo.memoId)) {
        return prev;
      }

      return [...prev, memo];
    });
  }, []);

  const removeMemo = useCallback((memoId: number) => {
    setSelectedMemos((prev) =>
      prev.filter((selectedMemo) => selectedMemo.memoId !== memoId),
    );
  }, []);

  const clearMemos = useCallback(() => setSelectedMemos([]), []);

  const value = useMemo(
    () => ({
      isOpen,
      selectedMemos,
      open,
      close,
      toggle,
      addMemo,
      removeMemo,
      clearMemos,
    }),
    [
      addMemo,
      clearMemos,
      close,
      isOpen,
      open,
      removeMemo,
      selectedMemos,
      toggle,
    ],
  );

  return (
    <AiPanelContext.Provider value={value}>{children}</AiPanelContext.Provider>
  );
};

export const useAiPanel = () => {
  const context = useContext(AiPanelContext);

  if (!context) {
    throw new Error(
      'useAiPanel은 <AiPanelProvider> 내부에서만 사용할 수 있습니다.',
    );
  }

  return context;
};
