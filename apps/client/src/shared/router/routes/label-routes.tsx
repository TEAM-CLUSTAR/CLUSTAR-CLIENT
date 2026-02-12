import { RouteObject } from 'react-router';

import { LabelPage } from '../lazy';
import { PATH } from '../path';

export const labelRoutes: RouteObject[] = [
  {
    path: PATH.LABEL,
    Component: LabelPage,
  },
];
