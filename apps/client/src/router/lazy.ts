import { lazy } from 'react';

export const NewMemoPage = lazy(() => import('@pages/new-memo/new-memo-page'));
export const LoginPage = lazy(() => import('@pages/login/login-page'));
export const MemoPage = lazy(() => import('@pages/memo/memo-page'));
export const StructurePage = lazy(
  () => import('@pages/structure/structure-page'),
);
