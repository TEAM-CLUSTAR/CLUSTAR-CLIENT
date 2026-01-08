import type { RouteObject } from 'react-router';
import { PATH } from '../path';

import { SplashPage } from '@pages/splash';
import { MemoPage, LoginPage, HomePage, AiResultsPage } from '../lazy';

export const globalRoutes: RouteObject[] = [
  {
    path: PATH.MEMO,
    Component: MemoPage,
  },
  {
    path: PATH.LOGIN,
    Component: LoginPage,
  },
  {
    path: PATH.SPLASH,
    Component: SplashPage,
  },
  {
    path: PATH.HOME,
    Component: HomePage,
  },
  {
    path: PATH.AI_RESULTS,
    Component: AiResultsPage,
  },
];
