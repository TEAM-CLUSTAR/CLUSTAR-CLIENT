import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/api/instance';

import { type MockMemo } from '@widgets/memo-list/types/memo';
import { mapApiMemoToMockMemo } from '@widgets/memo-list/types/memo';

import { ALL_MEMO_END_POIINT } from './end-point';
import { ALL_MEMO_KEY } from './query-key';
import { type AllMemoResponse } from './type';

export const getAllMemo = async (
  labelIds?: number[],
): Promise<AllMemoResponse> => {
  const response = await api.get<AllMemoResponse>(ALL_MEMO_END_POIINT.GET, {
    params: { labelIds },
  });
  return response.data;
};

export const useGetAllMemo = (labelIds?: number[]) => {
  return useQuery<AllMemoResponse, Error, MockMemo[]>({
    queryKey: ALL_MEMO_KEY.GET(labelIds),
    queryFn: () => getAllMemo(labelIds),
    select: (res) => {
      const apiMemos = res.data?.memos ?? [];
      return apiMemos.map(mapApiMemoToMockMemo);
    },
  });
};
