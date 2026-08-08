import { paths } from '@shared/types/schema';

/** 태그 목록 조회 API의 응답 전체 (`{ code, msg, data }`) */
export type TagListApiResponse =
  paths['/api/v1/tag']['get']['responses']['200']['content']['*/*'];
