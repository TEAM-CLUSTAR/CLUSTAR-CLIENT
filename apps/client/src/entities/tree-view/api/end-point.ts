import { MemoDetailRequest } from './type';

export const MEMO_MODAL_END_POINT = {
  DETAIL: ({ memoId }: MemoDetailRequest) => `/api/v1/memo/${memoId}`,
};
