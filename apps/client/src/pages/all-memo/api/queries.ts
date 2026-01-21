import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { api } from '@shared/api/instance';
import { components, paths } from '@shared/types/schema';

import { type MockMemo } from '@widgets/memo-list/types/memo';
import { mapApiMemoToMockMemo } from '@widgets/memo-list/types/memo';

import { ALL_MEMO_END_POIINT, LABEL_END_POINT } from './end-point';
import { ALL_MEMO_KEY, LABEL_KEY } from './query-key';
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
  labelIds?: number[],
  cursor?: MemoCursor,
  size = 20,
): Promise<AllMemoResponse> => {
  const response = await api.get<AllMemoResponse>(ALL_MEMO_END_POIINT.GET, {
    params: {
      labelIds,
      cursorCreatedAt: cursor?.cursorCreatedAt,
      cursorMemoId: cursor?.cursorMemoId,
      size,
    },
  });
  return response.data;
};

const getMemoTotalCount = async (
  labelIds?: number[],
): Promise<number | undefined> => {
  const response = await api.get<AllMemoResponse>(ALL_MEMO_END_POIINT.GET, {
    params: {
      labelIds,
      size: 1,
    },
  });
  return response.data.data?.totalCount;
};

export const useGetMemoTotalCount = (labelIds?: number[]) => {
  return useQuery({
    queryKey: [
      ...ALL_MEMO_KEY.ALL,
      'totalCount',
      ...(labelIds ? [{ labelIds }] : []),
    ],
    queryFn: () => getMemoTotalCount(labelIds),
  });
};

export const useGetAllMemo = (labelIds?: number[], size = 20) => {
  return useInfiniteQuery<
    AllMemoResponse,
    Error,
    MockMemo[],
    ReturnType<typeof ALL_MEMO_KEY.GET>,
    MemoCursor
  >({
    queryKey: ALL_MEMO_KEY.GET(labelIds),
    queryFn: ({ pageParam }) => getAllMemo(labelIds, pageParam, size),
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
    select: (data) => {
      const flatApiMemos: MemoDashboardResponse[] = data.pages.flatMap((p) =>
        getMemosFromResponse(p),
      );
      const result: MockMemo[] = flatApiMemos.map(
        (memo: MemoDashboardResponse) => mapApiMemoToMockMemo(memo),
      );
      return result;
    },
  });
};

type LabelListResponse = components['schemas']['LabelListResponse'];
type ApiLabelResponse =
  paths['/api/v1/label']['get']['responses']['200']['content']['*/*'];

const getAllLabels = async (): Promise<LabelListResponse['labels']> => {
  const response = await api.get<ApiLabelResponse>(LABEL_END_POINT.GET);
  return response.data.data?.labels ?? [];
};

export const useGetLabel = () => {
  return useQuery({
    queryKey: LABEL_KEY.GET(),
    queryFn: () => getAllLabels(),
  });
};
