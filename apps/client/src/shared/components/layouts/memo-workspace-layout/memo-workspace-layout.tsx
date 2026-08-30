import { ReactNode } from 'react';

import MemoTabBar from '@shared/components/memo-tab-bar/memo-tab-bar';
import { useMemoTabs } from '@shared/components/memo-tab-bar/memo-tab-context';

import * as styles from './memo-workspace-layout.css';

interface MemoWorkspaceLayoutProps {
  children: ReactNode;
}

const MemoWorkspaceLayout = ({ children }: MemoWorkspaceLayoutProps) => {
  const { tabs } = useMemoTabs();

  return (
    <div className={styles.workspace}>
      {tabs.length > 0 && <MemoTabBar />}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MemoWorkspaceLayout;
