export const TAG_KEY = {
  ALL: ['tag'],
  GET_ALL: () => [...TAG_KEY.ALL, 'get'],
  POST: () => [...TAG_KEY.ALL, 'post'],
};
