export const MEMOS_KEY = {
  ALL: ['all/memos'],
  GET: (tagIds?: number[]) => [
    ...MEMOS_KEY.ALL,
    'get',
    ...(tagIds ? [{ tagIds }] : []),
  ],
};
