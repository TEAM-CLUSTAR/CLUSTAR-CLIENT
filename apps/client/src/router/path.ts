export const PATH = {
  ROOT: '/',
  LANDING: '/landing',
  LOGIN: '/login',
  LOGIN_CALLBACK: '/oauth/callback',
  MEMO: '/memo',
  /** 라우트 정의용 패턴이에요. 실제 경로는 getMemoDetailPath로 만들어요. */
  MEMO_DETAIL: '/memo/:memoId',
  MEMOS: '/memos',
  STRUCTURE: '/structure',
} as const;

export type Routes = (typeof PATH)[keyof typeof PATH];

export const getMemoDetailPath = (memoId: number) => `${PATH.MEMO}/${memoId}`;
