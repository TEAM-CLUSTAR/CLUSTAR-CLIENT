import { getMemoDetailPath, PATH } from '@router/path';
import { useLocation, useMatch, useNavigate } from 'react-router';

import AddMemoButton from './components/add-memo-button/add-memo-button';
import MemoTab from './components/memo-tab/memo-tab';
import { DRAFT_TAB_ID, getMemoTabId, useMemoTabs } from './memo-tab-context';

import * as styles from './memo-tab-bar.css';

const MemoTabBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { tabs, openDraftTab, closeTab } = useMemoTabs();

  const memoDetailMatch = useMatch(PATH.MEMO_DETAIL);
  const memoIdParam = memoDetailMatch?.params.memoId;
  const activeTabId =
    pathname === PATH.MEMO_NEW
      ? DRAFT_TAB_ID
      : memoIdParam == null
        ? null
        : getMemoTabId(Number(memoIdParam));

  const handleSelectTab = (memoId: number | null) => {
    navigate(memoId == null ? PATH.MEMO_NEW : getMemoDetailPath(memoId));
  };

  const handleAddTab = () => {
    openDraftTab();
    navigate(PATH.MEMO_NEW);
  };

  return (
    <div className={styles.tabBar}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <MemoTab
            key={tab.tabId}
            memoTitle={tab.title || '제목 없음'}
            isSelected={tab.tabId === activeTabId}
            onSelectTab={() => handleSelectTab(tab.memoId)}
            onCloseTab={() => closeTab(tab.tabId, tab.tabId === activeTabId)}
          />
        ))}
      </div>
      <AddMemoButton onClick={handleAddTab} />
    </div>
  );
};

export default MemoTabBar;
