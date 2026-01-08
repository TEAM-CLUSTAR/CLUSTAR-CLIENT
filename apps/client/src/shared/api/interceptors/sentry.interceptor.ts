import * as Sentry from '@sentry/react';
import type { AxiosError, AxiosInstance } from 'axios';

import { SENTRY_IGNORE_STATUSES } from '../config/status';

const normalizePathParams = (path: string) =>
  path.replace(/\/\d+(?=\/|$)/g, '/{id}');

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

      err.name = buildErrorName(err);

      if (!status || !SENTRY_IGNORE_STATUSES.has(status)) {
        Sentry.captureException(err);
      }

      return Promise.reject(err);
    },
  );

  return http;
};
