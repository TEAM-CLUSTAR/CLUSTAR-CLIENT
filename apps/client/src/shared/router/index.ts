import { createBrowserRouter } from 'react-router';
import { PATH } from './path';

import { MemoPage } from '@pages/memo';
import { LoginPage } from '@pages/login';
import { SplashPage } from '@pages/splash';
import { HomePage } from '@pages/home';
import { AiResultsPage } from '@pages/ai-results';

export const router = createBrowserRouter([
  {
    path: PATH.MEMO,
    Component: MemoPage,
  },
  {
    path: PATH.LOGIN,
    Component: LoginPage,
  },
  {
    path: PATH.SPLASH,
    Component: SplashPage,
  },
  {
    path: PATH.HOME,
    Component: HomePage,
  },
  {
    path: PATH.AI_RESULTS,
    Component: AiResultsPage,
  },
]);
