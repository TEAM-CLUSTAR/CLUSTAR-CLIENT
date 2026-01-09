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
  const base = err.config?.baseURL ?? '';
  const path = err.config?.url ?? '';
  const fullUrl = /^https?:\/\//.test(path) ? path : `${base}${path}`;

  const url = new URL(fullUrl, window.location.origin);
  const method = (err.config?.method ?? 'UNKNOWN').toUpperCase();
  const status = err.response?.status ?? 'Network';

  return `[${status}] ${method} ${normalizePathParams(url.pathname)}`;
};

export const SentryInterceptor = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      const status = err.response?.status;

      // 1. 에러 이름 정규화
      err.name = buildErrorName(err);

      // 2. 네트워크 에러
      if (!err.response) {
        Sentry.captureException(err, {
          level: 'fatal',
          tags: {
            error_type: 'network_error',
          },
        });

        return Promise.reject(err);
      }

      // 3. API 에러 (ignore status 제외)
      if (!SENTRY_IGNORE_STATUSES.has(status!)) {
        Sentry.captureException(err, {
          level: 'error',
          tags: {
            error_type: 'api_error',
            status_code: status?.toString(),
            method: err.config?.method,
            url: err.config?.url,
          },
        });
      }

      return Promise.reject(err);
    },
  );

  return http;
};
