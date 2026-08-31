import {
  mutationOptions,
  queryOptions,
  skipToken,
} from '@tanstack/react-query';
import axios from 'axios';

import { api } from '@shared/apis/instance';

import { MemoType } from '../types/memo-type';
import { MEMO_END_POIINT } from './end-point';
import { MEMO_KEY } from './query-key';
import {
  DeleteMemoResponse,
  GetMemoResponse,
  PatchMemoRequestBody,
  PatchMemoResponse,
  PostMemoRequestBody,
  PostMemoResponse,
  PostPresignedUrlsRequestBody,
  PostPresignedUrlsResponse,
} from './type';

interface PatchMemoParams {
  memoId: number;
  body: PatchMemoRequestBody;
}

/**
 * 상세 메모 정보 조회
 * @param memoId - 조회할 메모 ID
 * @returns 상세 메모 정보
 */
const getMemo = async (memoId: number): Promise<GetMemoResponse> => {
  const response = await api.get<GetMemoResponse>(MEMO_END_POIINT.GET(memoId));
  return response.data;
};

/**
 * 훅이 아니라 queryOptions를 만드는 함수예요.
 * 컴포넌트 밖(저장 직후 강제 갱신 등)에서도 같은 키·조회 방식을 쓰려고 이름에서 use를 뺐어요.
 */
export const useGetMemo = (memoId: number | null) => {
  return queryOptions({
    queryKey: MEMO_KEY.GET(memoId),
    queryFn: memoId === null ? skipToken : () => getMemo(memoId),
  });
};

/**
 * 새 메모 작성
 * @param body - 메모 작성 요청 데이터
 * @returns 생성된 메모의 memoId, createdAt, updatedAt
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
 * @returns 수정된 메모의 memoId, createdAt, updatedAt
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

/**
 * 새 메모는 작성 응답을 받은 뒤에야 memoId가 생겨서, 훅을 부르는 시점에는 아직 없어요.
 * 그래서 memoId를 훅 인자가 아니라 mutation 변수로 함께 넘겨요.
 */
export const usePatchMemo = () => {
  return mutationOptions({
    mutationKey: MEMO_KEY.PATCH(),
    mutationFn: ({ memoId, body }: PatchMemoParams) => patchMemo(memoId, body),
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

export const useDeleteMemo = () => {
  return mutationOptions({
    mutationKey: MEMO_KEY.DELETE(),
    mutationFn: deleteMemo,
  });
};

// ==========================================================================
// ==========================================================================

/**
 * 이미지·파일 업로드용 presigned URL 발급
 * @param body - 업로드할 이미지/파일의 확장자·크기·정렬 순서
 * @returns 업로드할 presigned URL과 저장 시 함께 보낼 s3Key
 */
const issuePresignedUrls = async (
  body: PostPresignedUrlsRequestBody,
): Promise<PostPresignedUrlsResponse> => {
  const response = await api.post<PostPresignedUrlsResponse>(
    MEMO_END_POIINT.PRESIGNED_URLS,
    body,
  );
  return response.data;
};

export const useIssuePresignedUrls = () => {
  return mutationOptions({
    mutationKey: MEMO_KEY.PRESIGNED_URLS(),
    mutationFn: issuePresignedUrls,
  });
};

/**
 * S3에 파일 업로드
 */
export const uploadToS3 = async (
  presignedUrl: string,
  contentType: string,
  file: File,
) => {
  await axios.put(presignedUrl, file, {
    headers: { 'Content-Type': contentType },
  });
};

/**
 * 서버가 주는 첨부는 모두 저장된 상태라, 화면이 쓰는 도메인 모양으로 상태를 붙임.
 */
export const toMemoDetail = (response: GetMemoResponse): MemoType => {
  const memoDetail = response.data;

  if (memoDetail === undefined) {
    throw new Error();
  }

  return {
    ...memoDetail,
    images: memoDetail.images.map((image) => ({ ...image, status: 'saved' })),
    files: memoDetail.files.map((file) => ({ ...file, status: 'saved' })),
  };
};
