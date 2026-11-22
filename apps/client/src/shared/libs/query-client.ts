import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { HTTP_STATUS_CODE } from '@shared/apis/status';

const isProd = process.env.NODE_ENV === 'production';

const isUnauthorizedError = (error: Error) =>
  isAxiosError(error) &&
  error.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error) =>
          !isUnauthorizedError(error) && failureCount < (isProd ? 2 : 0),
        staleTime: 60 * 1000,
        throwOnError: (error) => !isUnauthorizedError(error),
      },
    },
  });
}
