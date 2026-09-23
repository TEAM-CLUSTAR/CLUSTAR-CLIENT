import { PATH } from '@router/path';
import { useMatch, useNavigate, useNavigation } from 'react-router';

import AddMemoButton from './components/add-memo-button/add-memo-button';
import MemoTab from './components/memo-tab/memo-tab';
import { getMemoTabId, useMemoTabs } from './memo-tab-context';

import * as styles from './memo-tab-bar.css';

const MemoTabBar = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { tabs, closeTab } = useMemoTabs();

  const memoDetailMatch = useMatch(PATH.MEMO_DETAIL);
  const memoIdParam = memoDetailMatch?.params.memoId;
  const activeTabId =
    memoIdParam == null ? null : getMemoTabId(Number(memoIdParam));
  const isCreatingMemo =
    navigation.state !== 'idle' &&
    navigation.location?.pathname === PATH.MEMO_NEW;

  const handleSelectTab = (memoId: number) => {
    navigate(`${PATH.MEMOS}/${memoId}`);
  };

  const handleAddTab = () => {
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
      <AddMemoButton onClick={handleAddTab} disabled={isCreatingMemo} />
    </div>
  );
};

export default MemoTabBar;
