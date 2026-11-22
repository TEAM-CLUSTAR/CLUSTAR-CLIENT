export const TRASH_KEY = {
  ALL: ['trash'],
  RESTORE: () => [...TRASH_KEY.ALL, 'restore'],
};
