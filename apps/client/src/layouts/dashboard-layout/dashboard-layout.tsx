import { ReactNode } from 'react';
import { AiPanel, AiPanelProvider, useAiPanel } from '@features/ai-panel';
import { Sidebar, SidebarProvider } from '@features/sidebar';

import { FloatingButton } from '@cds/ui';

import { MemoTabProvider } from '@shared/components/memo-tab-bar/memo-tab-context';

import * as styles from './dashboard-layout.css';

interface DashboardLayoutContentProps {
  children: ReactNode;
}

const DashboardLayoutContent = ({ children }: DashboardLayoutContentProps) => {
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

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <MemoTabProvider>
        <AiPanelProvider>
          <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </AiPanelProvider>
      </MemoTabProvider>
    </SidebarProvider>
  );
};

export default DashboardLayout;
