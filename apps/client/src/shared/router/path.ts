export const PATH = {
  SPLASH: '/splash',
  LOGIN: '/login',
  NEW_MEMO: '/',
  ALL_MEMO: '/all-memo',
  AI_RESULTS: '/ai-results',
  LABEL: '/label/:labelId',
} as const;

export type Routes = (typeof PATH)[keyof typeof PATH];
