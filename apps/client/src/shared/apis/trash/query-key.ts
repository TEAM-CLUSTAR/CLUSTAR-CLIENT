export const TRASH_KEY = {
  ALL: ['trash'],
  GET_LIST: () => [...TRASH_KEY.ALL, 'list'],
  RESTORE: () => [...TRASH_KEY.ALL, 'restore'],
  DELETE: () => [...TRASH_KEY.ALL, 'delete'],
  EMPTY: () => [...TRASH_KEY.ALL, 'empty'],
};
