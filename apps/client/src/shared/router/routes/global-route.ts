import type { RouteObject } from 'react-router';

import { SplashPage } from '@pages/splash';

import { AiResultsPage, HomePage, LoginPage, MemoPage } from '../lazy';
import { PATH } from '../path';

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
