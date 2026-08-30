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
  const locationState = location.state as LocationState | null;
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
    // TODO: 상세 조회 API가 붙으면 제목을 그 응답에서 받아 채운다.
    // 지금은 목록에서 넘어온 힌트가 없으면(딥링크로 직접 들어온 경우) 빈 값으로 연다.
    openMemoTab(memoId, locationState?.title ?? '');
  }, [activeTabId, memoId, tabs, locationState, openDraftTab, openMemoTab]);

  return (
    <div className={styles.pageContainer}>
      <MemoDetail
        key={activeTabId}
        memoId={memoId}
        onDeleteMemo={() => closeTab(activeTabId, true)}
        onTitleChange={(title) => renameTab(activeTabId, title)}
        defaultTagPopoverOpen={locationState?.openTagPopover ?? false}
      />
    </div>
  );
};

export default MemoPage;
