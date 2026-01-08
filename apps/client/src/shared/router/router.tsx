import { createBrowserRouter } from 'react-router';

import { GlobalLayout } from '@widgets/global-layout';

import { globalRoutes } from './routes/global-route';

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [...globalRoutes],
  },
]);
