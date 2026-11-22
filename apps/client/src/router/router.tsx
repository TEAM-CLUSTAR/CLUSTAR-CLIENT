import {
  createBrowserRouter,
  type LoaderFunctionArgs,
  redirect,
  replace,
} from 'react-router';

import LoginCallbackPage from '@pages/login-callback/login-callback-page';
import { postMemo } from '@pages/memo/apis/queries';

import { getSession } from '@shared/auth/session';
import ErrorFallback from '@shared/components/error-fallback/error-fallback';
import NotFound from '@shared/components/not-found/not-found';

import { logoutAction } from './actions/logout-action';
import { LoginPage, MemoPage, MemosPage } from './lazy';
import { privateLoader, publicLoader } from './loaders/auth-loaders';
import { PATH } from './path';
import DashboardRoute from './routes/dashboard-route';
import MemoWorkspaceRoute from './routes/memo-workspace-route';
import PrivateRoute from './routes/private-route';
import RootRoute from './routes/root-route';

const createMemoLoader = async () => {
  if (getSession().status !== 'authenticated') {
    return redirect(PATH.LOGIN);
  }

  const response = await postMemo({ title: '', content: '' });
  const memoId = response.data?.memoId;

  if (memoId === undefined) {
    throw new Error('메모 생성 응답에 memoId가 없어요.');
  }

  return replace(`${PATH.MEMOS}/${memoId}`);
};

export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    Component: RootRoute,
    ErrorBoundary: ErrorFallback,
    children: [
      {
        loader: publicLoader,
        children: [
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
        path: PATH.LOGOUT,
        action: logoutAction,
        loader: () => redirect(PATH.ROOT),
      },
      {
        loader: privateLoader,
        Component: PrivateRoute,
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
                    children: [
                      { index: true, Component: MemosPage },
                      { path: 'new', loader: createMemoLoader },
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
        Component: NotFound,
      },
    ],
  },
]);
