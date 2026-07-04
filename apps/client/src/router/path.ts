export const PATH = {
  ROOT: '/',
  LANDING: '/landing',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/oauth/callback',
  NEW_MEMO: '/new-memo',
  MEMO: '/memo',
  STRUCTURE: '/structure',
} as const;

export type Routes = (typeof PATH)[keyof typeof PATH];
