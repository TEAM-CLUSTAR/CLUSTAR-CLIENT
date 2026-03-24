import GlobalLayout from '@app/layouts/global-layout';
import PrivateLayout from '@app/layouts/private-layout/private-layout';
import PublicLayout from '@app/layouts/public-layout';
import { createBrowserRouter } from 'react-router';

import { NotFoundPage } from '@pages/not-found';

import AuthGuard from './auth-guard';
import { privateRoutes } from './routes/private-route';
import { publicRoutes } from './routes/public-route';

const PrivateLayoutWithGuard = () => {
  return (
    <AuthGuard>
      <PrivateLayout />
    </AuthGuard>
  );
};

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [
      {
        Component: PublicLayout,
        children: publicRoutes,
      },
      {
        Component: PrivateLayoutWithGuard,
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
