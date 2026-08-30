export const MEMO_KEY = {
  ALL: ['memo'],
  GET: (memoId: number) => [...MEMO_KEY.ALL, 'get', memoId],
  POST: () => [...MEMO_KEY.ALL, 'post'],
  DELETE: (memoId: number) => [...MEMO_KEY.ALL, 'delete', memoId],
};
