export const TRASH_KEY = {
  ALL: ['trash'],
  GET_LIST: () => [...TRASH_KEY.ALL, 'list'],
  RESTORE: () => [...TRASH_KEY.ALL, 'restore'],
};
