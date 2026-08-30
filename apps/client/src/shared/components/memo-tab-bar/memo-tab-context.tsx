import { createContext, type ReactNode, useContext, useState } from 'react';
import { getMemoDetailPath, PATH } from '@router/path';
import { useNavigate } from 'react-router';

import { clearMemoTabs, getMemoTabs, setMemoTabs } from './memo-tab-storage';

export const DRAFT_TAB_ID = 'draft';

export interface MemoTabItem {
  tabId: string;
  memoId: number | null;
  title: string;
}

interface MemoTabContextValue {
  tabs: MemoTabItem[];
  openMemoTab: (memoId: number, title: string) => void;
  openDraftTab: () => void;
  closeTab: (tabId: string) => void;
  renameTab: (tabId: string, title: string) => void;
}

const MemoTabContext = createContext<MemoTabContextValue | null>(null);

const DRAFT_TAB: MemoTabItem = {
  tabId: DRAFT_TAB_ID,
  memoId: null,
  title: '',
};

export const getMemoTabId = (memoId: number) => String(memoId);

export const MemoTabProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(getMemoTabs);

  const updateTabs = (nextTabs: MemoTabItem[]) => {
    setTabs(nextTabs);
    if (nextTabs.length === 0) {
      clearMemoTabs();
    } else {
      setMemoTabs(nextTabs);
    }
  };

  const openMemoTab = (memoId: number, title: string) => {
    const tabId = getMemoTabId(memoId);

    setTabs((previousTabs) => {
      const isNewTab = !previousTabs.some((tab) => tab.tabId === tabId);
      const nextTabs = isNewTab
        ? [...previousTabs, { tabId, memoId, title }]
        : previousTabs.map((tab) =>
            tab.tabId === tabId ? { ...tab, title } : tab,
          );

      setMemoTabs(nextTabs);
      return nextTabs;
    });
  };

  const openDraftTab = () => {
    setTabs((previousTabs) => {
      if (previousTabs.some((tab) => tab.tabId === DRAFT_TAB_ID)) {
        return previousTabs;
      }

      const nextTabs = [...previousTabs, DRAFT_TAB];
      setMemoTabs(nextTabs);
      return nextTabs;
    });
  };

  const closeTab = (tabId: string) => {
    const closedIndex = tabs.findIndex((tab) => tab.tabId === tabId);
    const remainingTabs = tabs.filter((tab) => tab.tabId !== tabId);

    const nextTab =
      remainingTabs.length === 0
        ? DRAFT_TAB
        : remainingTabs[Math.max(closedIndex - 1, 0)];

    updateTabs(remainingTabs.length === 0 ? [DRAFT_TAB] : remainingTabs);
    navigate(
      nextTab.memoId == null
        ? PATH.MEMO_NEW
        : getMemoDetailPath(nextTab.memoId),
    );
  };

  const renameTab = (tabId: string, title: string) => {
    setTabs((previousTabs) => {
      const nextTabs = previousTabs.map((tab) =>
        tab.tabId === tabId ? { ...tab, title } : tab,
      );
      setMemoTabs(nextTabs);
      return nextTabs;
    });
  };

  const value: MemoTabContextValue = {
    tabs,
    openMemoTab,
    openDraftTab,
    closeTab,
    renameTab,
  };

  return (
    <MemoTabContext.Provider value={value}>{children}</MemoTabContext.Provider>
  );
};

export const useMemoTabs = () => {
  const context = useContext(MemoTabContext);
  if (!context) {
    throw new Error(
      'useMemoTabs는 <MemoTabProvider> 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
};
