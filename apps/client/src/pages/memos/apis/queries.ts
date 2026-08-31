import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { api } from '@shared/apis/instance';
import { components } from '@shared/types/schema';

import { MEMOS_END_POIINT } from './end-point';
import { MEMOS_KEY } from './query-key';
import { type MemosResponse } from './type';

type MemoCursor =
  | {
      cursorCreatedAt?: string;
      cursorMemoId?: number;
    }
  | undefined;

type MemoDashboardResponse = components['schemas']['MemoDashboardResponse'];

/**
 * API 응답에서 memos 배열을 추출하는 헬퍼 함수
 * AllsMemo에서 response.data를 반환하므로, MemosResponse는 ApiResponseMemoListDashboardResponse 형태
 * 즉, { code, msg, data: { totalCount, memos } } 형태
 */
const getMemosFromResponse = (
  response: MemosResponse,
): MemoDashboardResponse[] => {
  return response.data?.memos ?? [];
};

const getMemos = async (
  tagIds?: number[],
  cursor?: MemoCursor,
  size = 20,
): Promise<MemosResponse> => {
  const response = await api.get<MemosResponse>(MEMOS_END_POIINT.GET, {
    params: {
      tagIds,
      cursorCreatedAt: cursor?.cursorCreatedAt,
      cursorMemoId: cursor?.cursorMemoId,
      size,
    },
  });
  return response.data;
};

const getMemoTotalCount = async (
  tagIds?: number[],
): Promise<number | undefined> => {
  const response = await api.get<MemosResponse>(MEMOS_END_POIINT.GET, {
    params: {
      tagIds,
      size: 1,
    },
  });
  return response.data.data?.totalCount;
};

export const useGetMemoTotalCount = (tagIds?: number[]) => {
  return useQuery({
    queryKey: [...MEMOS_KEY.ALL, 'totalCount', ...(tagIds ? [{ tagIds }] : [])],
    queryFn: () => getMemoTotalCount(tagIds),
    refetchOnMount: 'always', // 페이지로 돌아왔을 때 항상 refetch (staleTime 무시)
  });
};

export const useGetMemos = (tagIds?: number[], size = 20) => {
  return useInfiniteQuery<
    MemosResponse,
    Error,
    MemoDashboardResponse[],
    ReturnType<typeof MEMOS_KEY.GET>,
    MemoCursor
  >({
    queryKey: MEMOS_KEY.GET(tagIds),
    queryFn: ({ pageParam }) => getMemos(tagIds, pageParam, size),
    getNextPageParam: (lastPage) => {
      const memos = getMemosFromResponse(lastPage);
      const last = memos[memos.length - 1];

      if (!last) return undefined;

      return {
        cursorCreatedAt: last.createdAt,
        cursorMemoId: last.memoId,
      };
    },
    initialPageParam: undefined,
    staleTime: 0,
    select: (data) => data.pages.flatMap((p) => getMemosFromResponse(p)),
  });
};
