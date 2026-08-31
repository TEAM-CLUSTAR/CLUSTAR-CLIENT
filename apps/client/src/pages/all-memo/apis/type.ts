import { paths } from '@shared/types/schema';

export type AllMemoResponse =
  paths['/api/v1/memo']['get']['responses']['200']['content']['*/*'];

export type LabelResponse =
  paths['/api/v1/label']['get']['responses']['200']['content']['*/*'];
