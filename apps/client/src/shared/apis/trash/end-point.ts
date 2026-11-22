export const TRASH_END_POINT = {
  GET_LIST: 'api/v1/memo/trash',
  RESTORE: (memoId: number) => `api/v1/memo/trash/${memoId}/restore`,
};
