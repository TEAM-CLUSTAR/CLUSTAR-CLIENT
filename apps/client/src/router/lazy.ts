import { lazy } from 'react';

export const MemoPage = lazy(() => import('@pages/memo/memo-page'));
export const LoginPage = lazy(() => import('@pages/login/login-page'));
export const MemosPage = lazy(() => import('@pages/memos/memos-page'));
