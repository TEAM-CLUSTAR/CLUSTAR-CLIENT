import GlobalLayout from '@app/layouts/global-layout';
import PrivateLayout from '@app/layouts/private-layout/private-layout';
import PublicLayout from '@app/layouts/public-layout';
import { createBrowserRouter } from 'react-router';

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
import { RouteGuard } from './route-guard';

const GuardedPublicLayout = () => (
  <RouteGuard mode="public">
    <PublicLayout />
  </RouteGuard>
);

const GuardedPrivateLayout = () => (
  <RouteGuard mode="private">
    <PrivateLayout />
  </RouteGuard>
);

export const router = createBrowserRouter([
  {
    Component: GlobalLayout,
    children: [
      {
        Component: GuardedPublicLayout,
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
        Component: GuardedPrivateLayout,
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
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
    ErrorBoundary: NotFoundPage,
  },
]);
