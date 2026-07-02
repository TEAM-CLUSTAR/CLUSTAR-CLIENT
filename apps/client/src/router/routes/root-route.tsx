import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { LoadingPage } from '@pages/loading';

const RootRoute = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  );
};

export default RootRoute;
