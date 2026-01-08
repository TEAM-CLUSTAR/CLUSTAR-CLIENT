import { createBrowserRouter } from 'react-router';
import { globalRoutes } from './routes/global-route';
import { GlobalLayout } from '@widgets/global-layout';

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [...globalRoutes],
  },
]);
