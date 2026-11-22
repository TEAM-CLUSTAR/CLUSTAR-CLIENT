export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/oauth/callback',
  MEMOS: '/memos',
  MEMO_NEW: '/memos/new',
  MEMO_DETAIL: '/memos/:memoId',
  STRUCTURE: '/structure',
} as const;

export type Routes = (typeof PATH)[keyof typeof PATH];
