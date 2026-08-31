export const PATH = {
  ROOT: '/',
  LANDING: '/landing',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/oauth/callback',
  MEMO: '/memo',
  MEMO_NEW: '/memo/new',
  MEMO_DETAIL: '/memo/:memoId',
  MEMOS: '/memos',
  STRUCTURE: '/structure',
} as const;

export type Routes = (typeof PATH)[keyof typeof PATH];
