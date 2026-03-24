import { useQuery } from '@tanstack/react-query';

import { api } from '@shared/api/instance';
import { components } from '@shared/types/schema';

import { USER_END_POINT } from './end-point';
import { USER_KEY } from './query-key';
import { UserInfoResponse } from './type';

type UserInfoData = components['schemas']['UserInfoResponse'];

/**
 * 유저 정보 조회
 * @returns 유저 정보
 */
const getUserInfo = async (): Promise<UserInfoResponse> => {
  const response = await api.get<UserInfoResponse>(
    USER_END_POINT.GET_USER_INFO,
  );
  return response.data;
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: USER_KEY.GET_USER_INFO(),
    queryFn: getUserInfo,
    select: (response): UserInfoData | undefined => response.data,
  });
};
