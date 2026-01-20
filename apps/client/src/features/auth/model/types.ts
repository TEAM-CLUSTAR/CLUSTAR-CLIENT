import { paths } from '@shared/types/schema';

export type GoogleLoginResponse =
  paths['/oauth/google/callback']['get']['responses']['200']['content']['*/*'];
