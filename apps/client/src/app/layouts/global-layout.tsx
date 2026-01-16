import { Outlet } from 'react-router';

import GlobalLayoutBoundary from '../providers/global-error-boundary';

export default function GlobalLayout() {
  return (
    <GlobalLayoutBoundary>
      <Outlet />
    </GlobalLayoutBoundary>
  );
}
