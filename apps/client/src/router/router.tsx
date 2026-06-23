import { createBrowserRouter } from 'react-router';

import { LandingPage } from '@pages/landing';
import LoginCallbackPage from '@pages/login-callback/login-callback-page';
import { NotFoundPage } from '@pages/not-found';

import DashboardLayout from '@shared/components/layouts/dashboard-layout/dashboard-layout';

import {
  AiResultsPage,
  AllMemoPage,
  LabelPage,
  LoginPage,
  NewMemoPage,
} from './lazy';
import { PATH } from './path';
import { RouteGuard } from './route-guard';

export const router = createBrowserRouter([
  {
    element: <RouteGuard mode="public" />,
    children: [
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
    ],
  },
  {
    element: <RouteGuard mode="private" />,
    children: [
      {
        Component: DashboardLayout,
        children: [
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
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
