export const MEMO_END_POIINT = {
  GET: (memoId: number) => `api/v1/memo/${memoId}`,
  POST: 'api/v1/memo',
  PATCH: (memoId: number) => `api/v1/memo/${memoId}`,
  DELETE: (memoId: number) => `api/v1/memo/${memoId}`,
  PRESIGNED_URLS: 'api/v1/memo/presigned-urls',
};
