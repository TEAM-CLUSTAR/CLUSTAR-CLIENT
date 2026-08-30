import { MemoTabItem } from './memo-tab-context';

const MEMO_TABS_KEY = 'memoTabs';

export const getMemoTabs = (): MemoTabItem[] => {
  const raw = sessionStorage.getItem(MEMO_TABS_KEY);
  if (raw == null) {
    return [];
  }

  try {
    return JSON.parse(raw) as MemoTabItem[];
  } catch {
    return [];
  }
};

export const setMemoTabs = (tabs: MemoTabItem[]): void => {
  sessionStorage.setItem(MEMO_TABS_KEY, JSON.stringify(tabs));
};

export const clearMemoTabs = (): void => {
  sessionStorage.removeItem(MEMO_TABS_KEY);
};
