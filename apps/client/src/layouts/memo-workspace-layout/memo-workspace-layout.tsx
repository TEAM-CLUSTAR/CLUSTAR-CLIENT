import { ReactNode } from 'react';

import MemoTabBar from '@shared/components/memo-tab-bar/memo-tab-bar';

import * as styles from './memo-workspace-layout.css';

interface MemoWorkspaceLayoutProps {
  children: ReactNode;
}

const MemoWorkspaceLayout = ({ children }: MemoWorkspaceLayoutProps) => {
  return (
    <div className={styles.workspace}>
      <MemoTabBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MemoWorkspaceLayout;
