import { RouteObject } from 'react-router';

import { LandingPage } from '@pages/landing';
import { LoginCallbackPage } from '@pages/login-callback';

import { LoginPage } from '../lazy';
import { PATH } from '../path';

export const authRoutes: RouteObject[] = [
  {
    path: PATH.LANDING,
    Component: LandingPage,
  },
  {
    path: PATH.LOGIN,
    Component: LoginPage,
  },
  {
    path: PATH.LOGIN_CALLBACK,
    Component: LoginCallbackPage,
  },
];
