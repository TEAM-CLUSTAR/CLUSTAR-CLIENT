import { RouteObject } from 'react-router';

import { AllMemoPage, NewMemoPage } from '../lazy';
import { PATH } from '../path';

export const memoRoutes: RouteObject[] = [
  {
    path: PATH.NEW_MEMO,
    Component: NewMemoPage,
  },
  {
    path: PATH.ALL_MEMO,
    Component: AllMemoPage,
  },
];
