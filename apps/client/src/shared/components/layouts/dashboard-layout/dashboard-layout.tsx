import { ReactNode } from 'react';
import { AiPanel, AiPanelProvider, useAiPanel } from '@features/ai-panel';

import { FloatingButton } from '@cds/ui';

import Sidebar from '../sidebar/sidebar';
import { SidebarProvider } from '../sidebar/sidebar-context';

import * as styles from './dashboard-layout.css';

const DashboardLayoutContent = ({ children }: { children: ReactNode }) => {
  const { isOpen: isAiPanelOpen, open: openAiPanel } = useAiPanel();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.mainContent({ isAiPanelOpen })}>{children}</div>
        {!isAiPanelOpen && (
          <div className={styles.aiPanelFab}>
            <FloatingButton isActive handleClick={() => openAiPanel()}>
              AI 생성하기
            </FloatingButton>
          </div>
        )}
        <AiPanel />
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AiPanelProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </AiPanelProvider>
    </SidebarProvider>
  );
}
