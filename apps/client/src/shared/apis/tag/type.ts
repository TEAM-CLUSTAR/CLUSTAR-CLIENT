import { components, paths } from '@shared/types/schema';

/** 태그 목록 조회 API의 응답 전체 (`{ code, msg, data }`) */
export type TagListApiResponse =
  paths['/api/v1/tag']['get']['responses']['200']['content']['*/*'];

/** 부모 태그 최대 10개 조회 API의 응답 전체 (`{ code, msg, data }`) */
export type TagParentListApiResponse =
  paths['/api/v1/tag/parents']['get']['responses']['200']['content']['*/*'];

/** 부모 태그 기반 하위(자식+손자) 태그 조회 API의 응답 전체 (`{ code, msg, data }`) */
export type TagHierarchyApiResponse =
  paths['/api/v1/tag/parents/{parentTagId}/children']['get']['responses']['200']['content']['*/*'];

/** 태그 생성 요청 바디 */
export type TagCreateRequest =
  paths['/api/v1/tag']['post']['requestBody']['content']['application/json'];

/** 태그 생성 API의 응답 전체 (`{ code, msg, data }`) */
export type TagCreateResponse =
  paths['/api/v1/tag']['post']['responses']['200']['content']['*/*'];

/** Tag 응답값 */
export type TagType = components['schemas']['TagResponse'];

/**
 * 화면에서 쓰는 태그.
 * 서버 스키마의 `tagId`는 옵셔널이지만 식별할 수 없는 태그는 선택도 렌더도 할 수 없어,
 * 경계에서 좁혀 화면 쪽에는 항상 존재하는 값으로 전달한다.
 */
export type TagNode = TagType & { tagId: number };
