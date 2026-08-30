export const MEMO_KEY = {
  ALL: ['memo'],
  GET: (memoId: number) => [...MEMO_KEY.ALL, 'get', memoId],
  POST: () => [...MEMO_KEY.ALL, 'post'],
};
