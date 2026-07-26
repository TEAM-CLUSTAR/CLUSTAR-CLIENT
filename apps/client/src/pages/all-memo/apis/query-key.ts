export const ALL_MEMO_KEY = {
  ALL: ['all/memos'],
  GET: (labelIds?: number[]) => [
    ...ALL_MEMO_KEY.ALL,
    'get',
    ...(labelIds ? [{ labelIds }] : []),
  ],
};

export const TAG_KEY = {
  ALL: ['tags'],
  GET: () => [...TAG_KEY.ALL, 'get'],
};
