import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { api } from '@shared/apis/instance';
import { components, paths } from '@shared/types/schema';

import { ALL_MEMO_END_POIINT, TAG_END_POINT } from './end-point';
import { ALL_MEMO_KEY, TAG_KEY } from './query-key';
import { type AllMemoResponse } from './type';

type MemoCursor =
  | {
      cursorCreatedAt?: string;
      cursorMemoId?: number;
    }
  | undefined;

type MemoDashboardResponse = components['schemas']['MemoDashboardResponse'];

/**
 * API 응답에서 memos 배열을 추출하는 헬퍼 함수
 * getAllMemo에서 response.data를 반환하므로, AllMemoResponse는 ApiResponseMemoListDashboardResponse 형태
 * 즉, { code, msg, data: { totalCount, memos } } 형태
 */
const getMemosFromResponse = (
  response: AllMemoResponse,
): MemoDashboardResponse[] => {
  return response.data?.memos ?? [];
};

const getAllMemo = async (
  tagIds?: number[],
  cursor?: MemoCursor,
  size = 20,
): Promise<AllMemoResponse> => {
  const response = await api.get<AllMemoResponse>(ALL_MEMO_END_POIINT.GET, {
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
  const response = await api.get<AllMemoResponse>(ALL_MEMO_END_POIINT.GET, {
    params: {
      tagIds,
      size: 1,
    },
  });
  return response.data.data?.totalCount;
};

export const useGetMemoTotalCount = (tagIds?: number[]) => {
  return useQuery({
    queryKey: [
      ...ALL_MEMO_KEY.ALL,
      'totalCount',
      ...(tagIds ? [{ tagIds }] : []),
    ],
    queryFn: () => getMemoTotalCount(tagIds),
    refetchOnMount: 'always', // 페이지로 돌아왔을 때 항상 refetch (staleTime 무시)
  });
};

export const useGetAllMemo = (tagIds?: number[], size = 20) => {
  return useInfiniteQuery<
    AllMemoResponse,
    Error,
    MemoDashboardResponse[],
    ReturnType<typeof ALL_MEMO_KEY.GET>,
    MemoCursor
  >({
    queryKey: ALL_MEMO_KEY.GET(tagIds),
    queryFn: ({ pageParam }) => getAllMemo(tagIds, pageParam, size),
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

type TagListResponse = components['schemas']['TagListResponse'];
type ApiTagResponse =
  paths['/api/v1/tag']['get']['responses']['200']['content']['*/*'];

const getAllTags = async (): Promise<TagListResponse['tags']> => {
  const response = await api.get<ApiTagResponse>(TAG_END_POINT.GET);
  return response.data.data?.tags ?? [];
};

export const useGetTag = () => {
  return useQuery({
    queryKey: TAG_KEY.GET(),
    queryFn: () => getAllTags(),
  });
};
