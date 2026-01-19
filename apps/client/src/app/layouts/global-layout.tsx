import { Outlet } from 'react-router';

import { AiModeProvider } from '@shared/contexts/ai-mode-context';

import GlobalErrorBoundary from '../providers/global-error-boundary';

export default function GlobalLayout() {
  return (
    <GlobalErrorBoundary>
      <AiModeProvider>
        <Outlet />
      </AiModeProvider>
    </GlobalErrorBoundary>
  );
}
