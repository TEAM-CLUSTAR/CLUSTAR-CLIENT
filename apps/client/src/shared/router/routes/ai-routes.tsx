import { RouteObject } from 'react-router';

import { AiResultsPage } from '../lazy';
import { PATH } from '../path';

export const aiRoutes: RouteObject[] = [
  {
    path: PATH.AI_RESULTS,
    Component: AiResultsPage,
  },
];
