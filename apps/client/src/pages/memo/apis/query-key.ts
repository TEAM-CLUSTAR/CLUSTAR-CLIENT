export const MEMO_KEY = {
  ALL: ['memo'],
  GET: (memoId: number | null) => [...MEMO_KEY.ALL, 'get', memoId],
  POST: () => [...MEMO_KEY.ALL, 'post'],
  PATCH: () => [...MEMO_KEY.ALL, 'patch'],
  DELETE: (memoId: number) => [...MEMO_KEY.ALL, 'delete', memoId],
};
