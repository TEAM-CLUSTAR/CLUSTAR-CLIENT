import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { getAccessToken, removeAccessToken } from '../../storage/token-storage';

/**
 * 요청 전에 토큰을 확인하고 헤더에 추가하는 인터셉터
 */
export const handleCheckAndSetToken = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const accessToken = getAccessToken();

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

/**
 * 401 Unauthorized 응답 처리 인터셉터
 */
export const handleUnauthorizedResponse = (error: AxiosError) => {
  if (error.response?.status === 401) {
    removeAccessToken();
  }

  return Promise.reject(error);
};
