import { operations, paths } from '@shared/types/schema';

/** Path Parameter */
export type MemoDetailRequest =
  operations['getOneDetailMemo']['parameters']['path'];

/** Response */
export type MemoDetailResponse =
  paths['/api/v1/memo/{memoId}']['get']['responses']['200']['content']['*/*'];
