export const PATH = {
  ROOT: '/',
  LANDING: '/landing',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/oauth/callback',
  MEMO: '/memo',
  MEMOS: '/memos',
  STRUCTURE: '/structure',
} as const;

export type Routes = (typeof PATH)[keyof typeof PATH];
