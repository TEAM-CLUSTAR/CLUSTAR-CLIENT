import { ReactNode } from 'react';
import { AiPanel, AiPanelProvider } from '@features/ai-panel';

import Sidebar from '../sidebar/sidebar';
import { SidebarProvider } from '../sidebar/sidebar-context';

import * as styles from './dashboard-layout.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AiPanelProvider>
        <div className={styles.root}>
          <Sidebar />
          <div className={styles.mainContent}>{children}</div>
          <AiPanel />
        </div>
      </AiPanelProvider>
    </SidebarProvider>
  );
}
