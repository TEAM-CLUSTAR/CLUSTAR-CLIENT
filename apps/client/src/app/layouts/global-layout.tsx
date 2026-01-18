import { Outlet } from 'react-router';

import GlobalErrorBoundary from '../providers/global-error-boundary';

export default function GlobalLayout() {
  return (
    <GlobalErrorBoundary>
      <Outlet />
    </GlobalErrorBoundary>
  );
}
