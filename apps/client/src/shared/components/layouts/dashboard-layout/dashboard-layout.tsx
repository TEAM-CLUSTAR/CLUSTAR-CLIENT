import { ReactNode } from 'react';

import Sidebar from '@shared/components/sidebar/sidebar';

import * as styles from './dashboard-layout.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>{children}</div>
      </div>
    </div>
  );
}
