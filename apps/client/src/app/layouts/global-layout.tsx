import { Outlet } from 'react-router';

import OAuthRedirectGuard from '@features/auth/ui/oauth-redirect-guard';

import GlobalErrorBoundary from '../providers/global-error-boundary';

export default function GlobalLayout() {
  return (
    <GlobalErrorBoundary>
      <OAuthRedirectGuard>
        <Outlet />
      </OAuthRedirectGuard>
    </GlobalErrorBoundary>
  );
}
