export const ALL_MEMO_KEY = {
  ALL: ['all/memos'],
  GET: (labelIds?: number[]) => [
    ...ALL_MEMO_KEY.ALL,
    'get',
    ...(labelIds ? [{ labelIds }] : []),
  ],
};

export const LABEL_KEY = {
  ALL: ['labels'],
  GET: () => [...LABEL_KEY.ALL, 'get'],
};
