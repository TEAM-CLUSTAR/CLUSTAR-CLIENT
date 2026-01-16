import { RouteObject } from 'react-router';

import { SplashPage } from '@pages/splash';

import { LoginPage } from '../lazy';
import { PATH } from '../path';

export const publicRoutes: RouteObject[] = [
  {
    path: PATH.LOGIN,
    Component: LoginPage,
  },
  {
    path: PATH.SPLASH,
    Component: SplashPage,
  },
];
