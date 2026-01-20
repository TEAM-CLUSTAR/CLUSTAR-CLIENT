import { RouteObject } from 'react-router';

import LoginCallbackPage from '@pages/login-callback/login-callback-page';
import { SplashPage } from '@pages/splash';

import { LoginPage } from '../lazy';
import { PATH } from '../path';

export const publicRoutes: RouteObject[] = [
  {
    path: PATH.LOGIN,
    Component: LoginPage,
  },
  {
    path: PATH.LOGIN_CALLBACK,
    Component: LoginCallbackPage,
  },
  {
    path: PATH.SPLASH,
    Component: SplashPage,
  },
];
