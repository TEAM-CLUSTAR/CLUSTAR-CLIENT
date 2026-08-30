export const MEMOS_KEY = {
  ALL: ['memos'],
  GET: (tagIds?: number[]) => [
    ...MEMOS_KEY.ALL,
    'get',
    ...(tagIds ? [{ tagIds }] : []),
  ],
};
