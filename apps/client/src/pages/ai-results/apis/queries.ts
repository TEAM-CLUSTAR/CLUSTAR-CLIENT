import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { api } from '@shared/api/instance';
import { components } from '@shared/types/schema';

import { type MockMemo } from '@widgets/memo-list/types/memo';
import { mapApiMemoToMockMemo } from '@widgets/memo-list/types/memo';

import { AI_END_POINT } from './end-point';
import { AI_MEMO_KEY } from './query-key';
import { AiMemoResponse } from './type';

type MemoCursor =
  | {
      cursorCreatedAt?: string;
      cursorMemoId?: number;
    }
  | undefined;

type MemoDashboardResponse = components['schemas']['MemoDashboardResponse'];

/**
 * API 응답에서 memos 배열을 추출하는 헬퍼 함수
 * getAiMemo에서 response.data를 반환하므로, AiMemoResponse는 ApiResponseMemoListDashboardResponse 형태
 * 즉, { code, msg, data: { totalCount, memos } } 형태
 */
const getMemosFromResponse = (
  response: AiMemoResponse,
): MemoDashboardResponse[] => {
  return response.data?.memos ?? [];
};

const getAIMemo = async (
  cursor?: MemoCursor,
  size = 20,
): Promise<AiMemoResponse> => {
  const response = await api.get<AiMemoResponse>(AI_END_POINT.GET, {
    params: {
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
  const response = await api.get<AiMemoResponse>(AI_END_POINT.GET, {
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
      ...AI_MEMO_KEY.ALL,
      'totalCount',
      ...(labelIds ? [{ labelIds }] : []),
    ],
    queryFn: () => getMemoTotalCount(labelIds),
  });
};

export const useGetAIMemo = (size = 20) => {
  return useInfiniteQuery<
    AiMemoResponse,
    Error,
    MockMemo[],
    ReturnType<typeof AI_MEMO_KEY.GET>,
    MemoCursor
  >({
    queryKey: AI_MEMO_KEY.GET(),
    queryFn: ({ pageParam }) => getAIMemo(pageParam, size),
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
