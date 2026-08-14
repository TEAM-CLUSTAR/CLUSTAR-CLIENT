import { ReactNode } from 'react';

import Sidebar from '../sidebar/sidebar';
import { SidebarProvider } from '../sidebar/sidebar-context';

import * as styles from './dashboard-layout.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className={styles.root}>
        <div className={styles.content}>
          <Sidebar />
          <div className={styles.mainContent}>{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
