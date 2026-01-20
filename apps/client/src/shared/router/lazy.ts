import { lazy } from 'react';

export const NewMemoPage = lazy(
  () => import('@pages/new-memo/ui/new-memo-page'),
);
export const LoginPage = lazy(() => import('@pages/login/ui/login-page'));
export const AllMemoPage = lazy(
  () => import('@pages/all-memo/ui/all-memo-page'),
);
export const AiResultsPage = lazy(
  () => import('@pages/ai-results/ui/ai-results-page'),
);
export const LabelPage = lazy(() => import('@pages/label/ui/label-page'));
