import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router';

import MemoDetail from '@pages/memo/components/memo-detail/memo-detail';

import {
  getMemoTabId,
  useMemoTabs,
} from '@shared/components/memo-tab-bar/memo-tab-context';

import * as styles from './memo-page.css';

type LocationState = {
  title?: string;
  openTagPopover?: boolean;
};

const MemoPage = () => {
  const location = useLocation();
  const { memoId: memoIdParam } = useParams();
  const { tabs, openMemoTab, closeTab, renameTab } = useMemoTabs();

  const memoId = Number(memoIdParam);
  const activeTabId = getMemoTabId(memoId);
  const ensuredTabIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (ensuredTabIdRef.current === activeTabId) {
      return;
    }
    ensuredTabIdRef.current = activeTabId;

    if (tabs.some((tab) => tab.tabId === activeTabId)) {
      return;
    }
    const state = location.state as LocationState | null;
    openMemoTab(memoId, state?.title ?? '');
  }, [activeTabId, memoId, tabs, location.state, openMemoTab]);

  return (
    <div className={styles.pageContainer}>
      <MemoDetail
        key={activeTabId}
        memoId={memoId}
        onDeleteMemo={() => closeTab(activeTabId, true)}
        onTitleChange={(title) => renameTab(activeTabId, title)}
        defaultTagPopoverOpen={
          (location.state as LocationState | null)?.openTagPopover ?? false
        }
      />
    </div>
  );
};

export default MemoPage;
