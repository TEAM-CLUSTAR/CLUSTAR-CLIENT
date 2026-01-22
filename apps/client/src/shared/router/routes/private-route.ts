import { RouteObject } from 'react-router';

import { AiResultsPage, AllMemoPage, LabelPage, NewMemoPage } from '../lazy';
import { PATH } from '../path';

export const privateRoutes: RouteObject[] = [
  {
    path: PATH.NEW_MEMO,
    Component: NewMemoPage,
  },
  {
    path: PATH.ALL_MEMO,
    Component: AllMemoPage,
  },
  {
    path: PATH.AI_RESULTS,
    Component: AiResultsPage,
  },
  {
    path: PATH.LABEL,
    Component: LabelPage,
  },
];
