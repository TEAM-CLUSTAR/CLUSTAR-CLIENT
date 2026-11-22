import { queryOptions } from '@tanstack/react-query';

import { api } from '@shared/apis/instance';
import { components } from '@shared/types/schema';

import { USER_END_POINT } from './end-point';
import { USER_KEY } from './query-key';
import { LogoutResponse, UserInfoResponse } from './type';

type UserInfoData = components['schemas']['UserInfoResponse'];

export const USER_QUERY_OPTION = {
  GET_USER: () => {
    return queryOptions({
      queryKey: USER_KEY.GET_USER(),
      queryFn: getUserInfo,
      select: (response): UserInfoData | undefined => response.data,
    });
  },
};

/**
 * 유저 정보 조회
 * @returns 유저 정보
 */
const getUserInfo = async (): Promise<UserInfoResponse> => {
  const response = await api.get<UserInfoResponse>(USER_END_POINT.GET_USER);
  return response.data;
};

/**
 *
 * @returns 로그 아웃
 */
export const logoutUser = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>(USER_END_POINT.LOGOUT_USER);
  return response.data;
};
