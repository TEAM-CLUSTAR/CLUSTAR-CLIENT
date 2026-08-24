import { paths } from '@shared/types/schema';

export type AllMemoResponse =
  paths['/api/v1/memo']['get']['responses']['200']['content']['*/*'];
