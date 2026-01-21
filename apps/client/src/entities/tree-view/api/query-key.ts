import { MemoDetailRequest } from './type';

export const MEMO_MODAL_KEY = {
  ALL: ['memo-modal'],
  DETAIL: ({ memoId }: MemoDetailRequest) => [
    ...MEMO_MODAL_KEY.ALL,
    'detail-memo',
    memoId,
  ],
};
