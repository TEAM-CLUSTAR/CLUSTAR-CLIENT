import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { api } from '@shared/apis/instance';

import { MEMO_END_POIINT } from './end-point';
import { MEMO_KEY } from './query-key';
import {
  DeleteMemoResponse,
  GetMemoResponse,
  PatchMemoRequestBody,
  PatchMemoResponse,
  PostMemoRequestBody,
  PostMemoResponse,
} from './type';

/**
 * 상세 메모 정보 조회
 * @returns 상세 메모 정보
 */
const getMemo = async (memoId: number): Promise<GetMemoResponse> => {
  const response = await api.get<GetMemoResponse>(MEMO_END_POIINT.GET(memoId));
  return response.data;
};

export const useGetMemo = (memoId: number) => {
  return queryOptions({
    queryKey: MEMO_KEY.GET(memoId),
    queryFn: () => getMemo(memoId),
  });
};

/**
 * 새 메모 작성
 *  @param body - 메모 작성 요청 데이터
 * @returns 메모 작성 응답 데이터
 */
const postMemo = async (
  body: PostMemoRequestBody,
): Promise<PostMemoResponse> => {
  const response = await api.post<PostMemoResponse>(MEMO_END_POIINT.POST, body);
  return response.data;
};

export const usePostMemo = () => {
  return mutationOptions({
    mutationKey: MEMO_KEY.POST(),
    mutationFn: postMemo,
  });
};

/**
 * 메모 수정
 * @param memoId - 수정할 메모 ID
 * @param body - 메모 수정 요청 데이터
 * @returns 메모 수정 응답 데이터
 */
const patchMemo = async (
  memoId: number,
  body: PatchMemoRequestBody,
): Promise<PatchMemoResponse> => {
  const response = await api.patch<PatchMemoResponse>(
    MEMO_END_POIINT.PATCH(memoId),
    body,
  );

  return response.data;
};

export const usePatchMemo = (memoId: number) => {
  return mutationOptions({
    mutationKey: MEMO_KEY.PATCH(memoId),
    mutationFn: (body: PatchMemoRequestBody) => patchMemo(memoId, body),
  });
};

/**
 * 메모 삭제
 * @param memoId - 삭제할 메모 ID
 * @returns 메모 삭제 응답 데이터
 */
const deleteMemo = async (memoId: number): Promise<DeleteMemoResponse> => {
  const response = await api.delete<DeleteMemoResponse>(
    MEMO_END_POIINT.DELETE(memoId),
  );
  return response.data;
};

export const useDeleteMemo = (memoId: number) => {
  return mutationOptions({
    mutationKey: MEMO_KEY.DELETE(memoId),
    mutationFn: () => deleteMemo(memoId),
  });
};
