import { createBrowserRouter } from 'react-router';

import GlobalLayout from '@widgets/layouts/ui/global-layout';
import PrivateLayout from '@widgets/layouts/ui/private-layout/private-layout';
import { PublicLayout } from '@widgets/layouts/ui/public-layout';

import { privateRoutes } from './routes/private-route';
import { publicRoutes } from './routes/public-route';

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [
      {
        Component: PublicLayout,
        children: publicRoutes,
      },
      {
        Component: PrivateLayout,
        children: privateRoutes,
      },
    ],
  },
]);
