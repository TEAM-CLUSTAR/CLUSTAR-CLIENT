import { paths } from '@shared/types/schema';

/** 휴지통 목록 조회 API의 응답 전체 (`{ code, msg, data }`) */
export type TrashMemosResponse =
  paths['/api/v1/memo/trash']['get']['responses']['200']['content']['*/*'];

/** 메모 복원 API의 응답 전체 (`{ code, msg, data }`) */
export type RestoreMemoResponse =
  paths['/api/v1/memo/trash/{memoId}/restore']['patch']['responses']['200']['content']['*/*'];
