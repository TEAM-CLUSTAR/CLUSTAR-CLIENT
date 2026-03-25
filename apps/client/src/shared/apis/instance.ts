import axios, { type AxiosInstance } from 'axios';

import { appConfig } from '../configs/app-config';
import {
  handleCheckAndSetToken,
  handleUnauthorizedResponse,
} from './interceptors/auth.interceptor';
import { SentryInterceptor } from './interceptors/sentry.interceptor';

const instance: AxiosInstance = axios.create({
  baseURL: appConfig.api.baseUrl,
});

/**
 * 요청 인터셉터: 토큰 추가
 */
instance.interceptors.request.use(handleCheckAndSetToken, (error) =>
  Promise.reject(error),
);

// 응답 인터셉터: 401 에러 처리
instance.interceptors.response.use(
  (response) => response,
  handleUnauthorizedResponse,
);

// Sentry 인터셉터 적용
export const api = SentryInterceptor(instance);
