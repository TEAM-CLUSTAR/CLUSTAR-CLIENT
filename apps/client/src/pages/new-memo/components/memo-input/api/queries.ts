import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ALL_MEMO_KEY } from '@pages/all-memo/api/query-key';

import { api } from '@shared/api/instance';

import { MEMO_END_POINT } from './end-point';
import { MEMO_KEY } from './query-key';
import { MemoCreateRequest, MemoCreateResponse } from './type';

/**
 * 메모 작성 API
 */
export const createMemo = async (
  request: MemoCreateRequest,
): Promise<MemoCreateResponse> => {
  const response = await api.post<MemoCreateResponse>(
    MEMO_END_POINT.CREATE,
    request,
  );
  return response.data;
};

/**
 * 메모 작성 Mutation Hook
 */
export const useCreateMemo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MEMO_KEY.CREATE(),
    mutationFn: createMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ALL_MEMO_KEY.ALL,
      });
    },
  });
};
