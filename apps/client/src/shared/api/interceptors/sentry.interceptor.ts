import * as Sentry from '@sentry/react';
import type { AxiosError, AxiosInstance } from 'axios';

import { SENTRY_IGNORE_STATUSES } from '../config/status';

/**
 * /users/123 -> /users/{id}
 */
const normalizePathParams = (path: string) =>
  path.replace(/\/\d+(?=\/|$)/g, '/{id}');

/**
 * [401] GET /users/{id}
 */
const buildErrorName = (err: AxiosError) => {
  const method = (err.config?.method ?? 'UNKNOWN').toUpperCase();
  const status = err.response?.status ?? 'Network';

  let path = (err.config?.url ?? '').trim();
  if (!path) path = '/unknown';

  try {
    const url = new URL(path, window.location.origin);
    path = url.pathname;
  } catch {
    // URL 생성 실패 시 raw 그대로 사용
  }

  path = path.split('?')[0];

  return `[${status}] ${method} ${normalizePathParams(path)}`;
};

export const SentryInterceptor = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      const status = err.response?.status;
      const normalizedName = buildErrorName(err);

      if (status != null && SENTRY_IGNORE_STATUSES.has(status)) {
        return Promise.reject(err);
      }

      // 1. 네트워크 에러
      if (!err.response) {
        Sentry.withScope((scope) => {
          scope.setLevel('fatal');
          scope.setTag('error_type', 'network_error');

          scope.setExtra('normalized_error_name', normalizedName);
          scope.setFingerprint(['axios', normalizedName]);

          Sentry.captureException(err);
        });

        return Promise.reject(err);
      }

      // 2. API 에러 (ignore status 제외)
      Sentry.withScope((scope) => {
        scope.setLevel('error');
        scope.setTag('error_type', 'api_error');
        if (status != null) {
          scope.setTag('status_code', String(status));
        }

        scope.setExtra('method', err.config?.method);
        scope.setExtra('url', err.config?.url);

        scope.setExtra('normalized_error_name', normalizedName);
        scope.setFingerprint(['axios', normalizedName]);

        Sentry.captureException(err);
      });
      return Promise.reject(err);
    },
  );

  return http;
};
