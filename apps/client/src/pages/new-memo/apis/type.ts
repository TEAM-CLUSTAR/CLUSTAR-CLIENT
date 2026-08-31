import { paths } from '@shared/types/schema';

export type MemoCreateRequest =
  paths['/api/v1/memo']['post']['requestBody']['content']['application/json'];

export type MemoCreateResponse =
  paths['/api/v1/memo']['post']['responses']['200']['content']['*/*'];
