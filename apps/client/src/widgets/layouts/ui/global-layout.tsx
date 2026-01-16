import { Outlet } from 'react-router';

import GlobalLayoutBoundary from '../../../apps/providers/global-error-boundary';

export default function GlobalLayout() {
  return (
    <GlobalLayoutBoundary>
      <Outlet />
    </GlobalLayoutBoundary>
  );
}
