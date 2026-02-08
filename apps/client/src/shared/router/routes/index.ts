import { RouteObject } from 'react-router';

import { LandingPage } from '@pages/landing';
import { LoginCallbackPage } from '@pages/login-callback';

import {
  AiResultsPage,
  AllMemoPage,
  LabelPage,
  LoginPage,
  NewMemoPage,
} from '../lazy';
import { PATH } from '../path';

type AuthRouteObject = RouteObject & {
  auth?: boolean;
};

export const routes: AuthRouteObject[] = [
  // Private Routes
  {
    path: PATH.NEW_MEMO,
    Component: NewMemoPage,
    auth: true,
  },
  {
    path: PATH.ALL_MEMO,
    Component: AllMemoPage,
    auth: true,
  },
  {
    path: PATH.AI_RESULTS,
    Component: AiResultsPage,
    auth: true,
  },
  {
    path: PATH.LABEL,
    Component: LabelPage,
    auth: true,
  },
  // Public Routes
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
