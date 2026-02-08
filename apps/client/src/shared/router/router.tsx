import GlobalLayout from '@app/layouts/global-layout';
import PrivateLayout from '@app/layouts/private-layout/private-layout';
import PublicLayout from '@app/layouts/public-layout';
import { createBrowserRouter } from 'react-router';

import { NotFoundPage } from '@pages/not-found';

import { PrivateRouteGuard, PublicRouteGuard } from './auth-guard';
import { routes } from './routes';

const GuardedPublicLayout = () => (
  <PublicRouteGuard>
    <PublicLayout />
  </PublicRouteGuard>
);

const GuardedPrivateLayout = () => (
  <PrivateRouteGuard>
    <PrivateLayout />
  </PrivateRouteGuard>
);

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [
      {
        Component: GuardedPublicLayout,
        children: routes.filter((r) => !r.auth),
      },
      {
        Component: GuardedPrivateLayout,
        children: routes.filter((r) => r.auth),
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
    ErrorBoundary: NotFoundPage,
  },
]);
