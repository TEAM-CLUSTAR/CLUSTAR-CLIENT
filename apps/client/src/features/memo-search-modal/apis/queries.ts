import { queryOptions } from '@tanstack/react-query';

import { api } from '@shared/apis/instance';

import { MEMO_SEARCH_MODAL_END_POINT } from './end-point';
import { MEMO_SEARCH_MODAL_KEY } from './query-key';
import type { MemoRecentViewedResponse, MemoSearchResponse } from './type';

const getRecentViewedMemos = async (): Promise<MemoRecentViewedResponse> => {
  const response = await api.get<MemoRecentViewedResponse>(
    MEMO_SEARCH_MODAL_END_POINT.RECENT_VIEWED,
  );

  return response.data;
};

const searchMemos = async (query: string): Promise<MemoSearchResponse> => {
  const response = await api.get<MemoSearchResponse>(
    MEMO_SEARCH_MODAL_END_POINT.SEARCH,
    {
      params: { query },
    },
  );

  return response.data;
};

export const recentViewedMemosQueryOptions = () =>
  queryOptions({
    queryKey: MEMO_SEARCH_MODAL_KEY.RECENT_VIEWED(),
    queryFn: getRecentViewedMemos,
  });

export const searchMemosQueryOptions = (query: string) =>
  queryOptions({
    queryKey: MEMO_SEARCH_MODAL_KEY.SEARCH(query),
    queryFn: () => searchMemos(query),
  });
