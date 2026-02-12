import GlobalLayout from '@app/layouts/global-layout';
import PrivateLayout from '@app/layouts/private-layout/private-layout';
import PublicLayout from '@app/layouts/public-layout';
import { createBrowserRouter } from 'react-router';

import { NotFoundPage } from '@pages/not-found';

import { RouteGuard } from './route-guard';
import {
  aiRoutes,
  authRoutes,
  fallbackRoutes,
  labelRoutes,
  memoRoutes,
} from './routes';

const GuardedPublicLayout = () => (
  <RouteGuard>
    <PublicLayout />
  </RouteGuard>
);

const GuardedPrivateLayout = () => (
  <RouteGuard requireAuth>
    <PrivateLayout />
  </RouteGuard>
);

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [
      {
        Component: GuardedPublicLayout,
        children: authRoutes,
      },
      {
        Component: GuardedPrivateLayout,
        children: [...memoRoutes, ...aiRoutes, ...labelRoutes],
      },
      ...fallbackRoutes,
    ],
    ErrorBoundary: NotFoundPage,
  },
]);
