import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router';

import MemoDetail from '@pages/memo/components/memo-detail/memo-detail';

import {
  DRAFT_TAB_ID,
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
  const { tabs, openMemoTab, openDraftTab, closeTab, renameTab } =
    useMemoTabs();

  const memoId = memoIdParam == null ? null : Number(memoIdParam);
  const activeTabId = memoId == null ? DRAFT_TAB_ID : getMemoTabId(memoId);
  const ensuredTabIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (ensuredTabIdRef.current === activeTabId) {
      return;
    }
    ensuredTabIdRef.current = activeTabId;

    if (tabs.some((tab) => tab.tabId === activeTabId)) {
      return;
    }
    if (memoId == null) {
      openDraftTab();
      return;
    }

    const state = location.state as LocationState | null;
    openMemoTab(memoId, state?.title ?? '');
  }, [activeTabId, memoId, tabs, location.state, openDraftTab, openMemoTab]);

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
