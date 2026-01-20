import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/api/instance';

import { ALL_MEMO_END_POIINT } from './end-point';
import { ALL_MEMO_KEY } from './query-key';
import { AllMemoResponse } from './type';

export const getAllMemo = async () => {
  const response = await api.get<AllMemoResponse>(ALL_MEMO_END_POIINT.GET);
  return response.data;
};

export const useGetAllMemo = () => {
  return useQuery({
    queryKey: ALL_MEMO_KEY.GET(),
    queryFn: getAllMemo,
  });
};
