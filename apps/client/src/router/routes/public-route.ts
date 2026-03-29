import { PATH } from '@router/path';
import { RouteObject } from 'react-router';

import { LandingPage } from '@pages/landing';
import LoginCallbackPage from '@pages/login-callback/login-callback-page';

import { LoginPage } from '../lazy';

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
    path: PATH.LANDING,
    Component: LandingPage,
  },
];
