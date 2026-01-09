import { lazy } from 'react';

export const MemoPage = lazy(() => import('@pages/memo/ui/memo-page'));
export const LoginPage = lazy(() => import('@pages/login/ui/login-page'));
export const HomePage = lazy(() => import('@pages/home/ui/home-page'));
export const AiResultsPage = lazy(
  () => import('@pages/ai-results/ui/ai-results-page'),
);
