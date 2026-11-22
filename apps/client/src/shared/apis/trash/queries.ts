import { mutationOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '../instance';
import { TRASH_END_POINT } from './end-point';
import { TRASH_KEY } from './query-key';
import { RestoreMemoResponse, TrashMemosResponse } from './type';

type TrashMemoCursor =
  | {
      cursorDeletedAt: string;
      cursorMemoId: number;
    }
  | undefined;

/**
 * 휴지통 메모 목록 조회
 * @param cursor - 이전 페이지 마지막 카드의 deletedAt, memoId
 * @param size - 한 페이지에 불러올 개수
 * @returns 휴지통 메모 목록과 전체 개수
 */
const getTrashMemos = async (
  cursor?: TrashMemoCursor,
  size = 20,
): Promise<TrashMemosResponse> => {
  const response = await api.get<TrashMemosResponse>(TRASH_END_POINT.GET_LIST, {
    params: { ...cursor, size },
  });
  return response.data;
};

export const useGetTrashMemos = (size = 20) => {
  return useInfiniteQuery({
    queryKey: TRASH_KEY.GET_LIST(),
    queryFn: ({ pageParam }) => getTrashMemos(pageParam, size),
    initialPageParam: undefined as TrashMemoCursor,
    getNextPageParam: (lastPage): TrashMemoCursor => {
      const memos = lastPage.data?.memos ?? [];
      const last = memos[memos.length - 1];
      if (!last) return undefined;

      return { cursorDeletedAt: last.deletedAt, cursorMemoId: last.memoId };
    },
    select: (data) => ({
      memos: data.pages.flatMap((page) => page.data?.memos ?? []),
      totalCount: data.pages[0]?.data?.totalCount,
    }),
  });
};

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
