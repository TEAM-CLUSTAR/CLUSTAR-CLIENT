import {
  createBrowserRouter,
  type LoaderFunctionArgs,
  redirect,
} from 'react-router';

import { ErrorPage } from '@pages/error';
import { LandingPage } from '@pages/landing';
import LoginCallbackPage from '@pages/login-callback/login-callback-page';
import { NotFoundPage } from '@pages/not-found';

import { LoginPage, MemoPage, MemosPage } from './lazy';
import { PATH } from './path';
import { RouteGuard } from './route-guard';
import AuthRoute from './routes/auth-route';
import DashboardRoute from './routes/dashboard-route';
import MemoWorkspaceRoute from './routes/memo-workspace-route';
import RootRoute from './routes/root-route';

export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    Component: RootRoute,
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
                index: true,
                loader: ({ request }: LoaderFunctionArgs) => {
                  const { search } = new URL(request.url);
                  return redirect(`${PATH.MEMOS}${search}`);
                },
              },
              {
                Component: MemoWorkspaceRoute,
                children: [
                  {
                    path: PATH.MEMOS,
                    Component: MemosPage,
                  },
                  {
                    path: PATH.MEMO,
                    loader: () => redirect(PATH.MEMO_NEW),
                    children: [
                      { path: 'new', Component: MemoPage },
                      { path: ':memoId', Component: MemoPage },
                    ],
                  },
                ],
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
