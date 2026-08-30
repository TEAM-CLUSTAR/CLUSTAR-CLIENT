import { paths } from '@shared/types/schema';

/**
 * @description 메모 요청 성공 응답
 */
export type GetMemoResponse =
  paths['/api/v1/memo/{memoId}']['get']['responses']['200']['content']['*/*'];

/**
 * @description 메모 작성 요청 파디
 */
export type PostMemoRequestBody =
  paths['/api/v1/memo']['post']['requestBody']['content']['application/json'];

/**
 * @description 메모 작성 성공 응답
 */
export type PostMemoResponse =
  paths['/api/v1/memo']['post']['responses']['200']['content']['*/*'];

/**
 * @description 메모 수정 요청 바디
 */
export type PatchMemoRequestBody =
  paths['/api/v1/memo/{memoId}']['patch']['requestBody']['content']['application/json'];

/**
 * @description 메모 수정 성공 응답
 */
export type PatchMemoResponse =
  paths['/api/v1/memo/{memoId}']['patch']['responses']['200']['content']['*/*'];

/**
 * @description 메모 삭제 성공 응답
 */
export type DeleteMemoResponse =
  paths['/api/v1/memo/{memoId}']['delete']['responses']['200']['content']['*/*'];
