import { paths } from '@shared/types/schema';

export type UserInfoResponse =
  paths['/api/v1/user']['get']['responses']['200']['content']['*/*'];

export type LogoutResponse =
  paths[`/logout`]['post']['responses']['200']['content']['*/*'];
