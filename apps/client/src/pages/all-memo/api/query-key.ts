export const ALL_MEMO_KEY = {
  ALL: ['all/memos'],
  GET: (labelIds?: number[]) => [
    ...ALL_MEMO_KEY.ALL,
    'get',
    ...(labelIds ? [{ labelIds }] : []),
  ],
};
