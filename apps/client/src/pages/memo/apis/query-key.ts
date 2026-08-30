export const MEMO_KEY = {
  ALL: ['memo'],
  GET: (memoId: number) => [...MEMO_KEY.ALL, 'get', memoId],
  POST: () => [...MEMO_KEY.ALL, 'post'],
  PATCH: (memoId: number) => [...MEMO_KEY.ALL, 'patch', memoId],
  DELETE: (memoId: number) => [...MEMO_KEY.ALL, 'delete', memoId],
};
