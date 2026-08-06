export const PATH = {
  LANDING: '/landing',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/oauth/callback',
  NEW_MEMO: '/',
  ALL_MEMO: '/all-memo',
  AI_RESULTS: '/ai-results',
  TAG: '/tag/:tagId',
} as const;

export type Routes = (typeof PATH)[keyof typeof PATH];
