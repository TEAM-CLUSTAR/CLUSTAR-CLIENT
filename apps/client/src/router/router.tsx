import { createBrowserRouter } from 'react-router';

import { ErrorPage } from '@pages/error';
import { LandingPage } from '@pages/landing';
import LoginCallbackPage from '@pages/login-callback/login-callback-page';
import { NotFoundPage } from '@pages/not-found';

import {
  AiResultsPage,
  AllMemoPage,
  LabelPage,
  LoginPage,
  NewMemoPage,
} from './lazy';
import { PATH } from './path';
import RootLayout from './root-layout';
import { RouteGuard } from './route-guard';
import AuthRoute from './routes/auth-route';
import DashboardRoute from './routes/dashboard-route';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        element: <RouteGuard mode="public" />,
        children: [
          {
            Component: AuthRoute,
            children: [
              {
                path: PATH.LANDING,
                Component: LandingPage,
              },
              {
                path: PATH.LOGIN,
                Component: LoginPage,
              },
            ],
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
            Component: DashboardRoute,
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
    ],
  },
]);
