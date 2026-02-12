export const PATH = {
  LANDING: '/landing',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/oauth/callback',
  NEW_MEMO: '/',
  ALL_MEMO: '/all-memo',
  AI_RESULTS: '/ai-results',
  LABEL: '/label/:labelId',
} as const;

export const GUEST_ONLY_PATHS = [
  PATH.LANDING,
  PATH.LOGIN,
  PATH.LOGIN_CALLBACK,
] as string[];

export type Routes = (typeof PATH)[keyof typeof PATH];
