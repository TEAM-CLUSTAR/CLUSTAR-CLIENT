export const PATH = {
  SPLASH: '/splash',
  LOGIN: '/login',
  MEMO: '/',
  HOME: '/home',
  AI_RESULTS: '/ai-results',
} as const;

export type Routes = (typeof PATH)[keyof typeof PATH];
