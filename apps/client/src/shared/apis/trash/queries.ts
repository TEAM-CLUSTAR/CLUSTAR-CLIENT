import { mutationOptions } from '@tanstack/react-query';

import { api } from '../instance';
import { TRASH_END_POINT } from './end-point';
import { TRASH_KEY } from './query-key';
import { RestoreMemoResponse } from './type';

/**
 * 휴지통 메모 복원
 * @param memoId - 복원할 메모 ID
 * @returns 복원된 메모 응답 데이터
 */
const restoreMemo = async (memoId: number): Promise<RestoreMemoResponse> => {
  const response = await api.patch<RestoreMemoResponse>(
    TRASH_END_POINT.RESTORE(memoId),
  );
  return response.data;
};

export const useRestoreMemo = () => {
  return mutationOptions({
    mutationKey: TRASH_KEY.RESTORE(),
    mutationFn: restoreMemo,
  });
};
