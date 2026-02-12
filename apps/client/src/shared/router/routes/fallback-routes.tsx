import { RouteObject } from 'react-router';

import { NotFoundPage } from '@pages/not-found';

export const fallbackRoutes: RouteObject[] = [
  {
    path: '*',
    Component: NotFoundPage,
  },
];
