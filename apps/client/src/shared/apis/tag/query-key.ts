export const TAG_KEY = {
  ALL: ['tag'],
  GET_ALL: () => [...TAG_KEY.ALL, 'get'],
  GET_PARENTS: () => [...TAG_KEY.ALL, 'parents'],
  GET_CHILDREN: (parentTagId: number) => [
    ...TAG_KEY.GET_PARENTS(),
    parentTagId,
    'children',
  ],
  POST: () => [...TAG_KEY.ALL, 'post'],
};
