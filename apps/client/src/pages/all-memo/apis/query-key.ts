export const ALL_MEMO_KEY = {
  ALL: ['all/memos'],
  GET: (tagIds?: number[]) => [
    ...ALL_MEMO_KEY.ALL,
    'get',
    ...(tagIds ? [{ tagIds }] : []),
  ],
};

export const TAG_KEY = {
  ALL: ['tags'],
  GET: () => [...TAG_KEY.ALL, 'get'],
};
