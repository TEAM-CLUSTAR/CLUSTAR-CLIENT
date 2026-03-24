import { lazy } from 'react';

export const NewMemoPage = lazy(() => import('@pages/new-memo/new-memo-page'));
export const LoginPage = lazy(() => import('@pages/login/login-page'));
export const AllMemoPage = lazy(() => import('@pages/all-memo/all-memo-page'));
export const AiResultsPage = lazy(
  () => import('@pages/ai-results/ai-results-page'),
);
export const LabelPage = lazy(() => import('@pages/label/label-page'));
