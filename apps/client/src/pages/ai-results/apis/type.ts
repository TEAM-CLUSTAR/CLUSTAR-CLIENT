import { paths } from '@shared/types/schema';

export type AiMemoResponse =
  paths['/api/v1/memo/ai']['get']['responses']['200']['content']['*/*'];
