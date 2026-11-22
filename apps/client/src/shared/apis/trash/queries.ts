import { mutationOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '../instance';
import { TRASH_END_POINT } from './end-point';
import { TRASH_KEY } from './query-key';
import {
  DeleteTrashMemoResponse,
  EmptyTrashResponse,
  RestoreMemoResponse,
  TrashMemosResponse,
} from './type';

type TrashMemoCursor = { cursorDeletedAt: string; cursorMemoId: number };

/**
 * 휴지통 메모 목록 조회
 * @param cursor - 이전 페이지 마지막 카드의 deletedAt, memoId
 * @returns 휴지통 메모 목록과 전체 개수
 */
const getTrashMemos = async (
  cursor?: TrashMemoCursor,
): Promise<TrashMemosResponse> => {
  const response = await api.get<TrashMemosResponse>(TRASH_END_POINT.GET_LIST, {
    params: cursor,
  });
  return response.data;
};

export const useGetTrashMemos = () => {
  return useInfiniteQuery({
    queryKey: TRASH_KEY.GET_LIST(),
    queryFn: ({ pageParam }) => getTrashMemos(pageParam),
    initialPageParam: undefined as TrashMemoCursor | undefined,
    getNextPageParam: (lastPage) => {
      const memos = lastPage.data?.memos ?? [];
      const last = memos[memos.length - 1];
      return (
        last && { cursorDeletedAt: last.deletedAt, cursorMemoId: last.memoId }
      );
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

/**
 * 휴지통 메모 영구 삭제
 * @param memoId - 영구 삭제할 메모 ID
 * @returns 메모 영구 삭제 응답 데이터
 */
const deleteTrashMemo = async (
  memoId: number,
): Promise<DeleteTrashMemoResponse> => {
  const response = await api.delete<DeleteTrashMemoResponse>(
    TRASH_END_POINT.DELETE(memoId),
  );
  return response.data;
};

export const useDeleteTrashMemo = () => {
  return mutationOptions({
    mutationKey: TRASH_KEY.DELETE(),
    mutationFn: deleteTrashMemo,
  });
};

/**
 * 휴지통 비우기
 * @returns 휴지통 비우기 응답 데이터
 */
const emptyTrash = async (): Promise<EmptyTrashResponse> => {
  const response = await api.delete<EmptyTrashResponse>(TRASH_END_POINT.EMPTY);
  return response.data;
};

export const useEmptyTrash = () => {
  return mutationOptions({
    mutationKey: TRASH_KEY.EMPTY(),
    mutationFn: emptyTrash,
  });
};
