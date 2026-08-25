export const ALL_MEMO_KEY = {
  ALL: ['all/memos'],
  GET: (tagIds?: number[]) => [
    ...ALL_MEMO_KEY.ALL,
    'get',
    ...(tagIds ? [{ tagIds }] : []),
  ],
};
