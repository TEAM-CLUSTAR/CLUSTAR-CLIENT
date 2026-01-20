import AuthGuard from '@app/layouts/auth-guard';
import GlobalLayout from '@app/layouts/global-layout';
import PrivateLayout from '@app/layouts/private-layout/private-layout';
import PublicLayout from '@app/layouts/public-layout';
import { createBrowserRouter } from 'react-router';

import { NotFoundPage } from '@pages/not-found';

import { privateRoutes } from './routes/private-route';
import { publicRoutes } from './routes/public-route';

const privateGuardElement = (
  <AuthGuard>
    <PrivateLayout />
  </AuthGuard>
);

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [
      {
        Component: PublicLayout,
        children: publicRoutes,
      },
      {
        element: privateGuardElement,
        children: privateRoutes,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
    ErrorBoundary: NotFoundPage,
  },
]);
