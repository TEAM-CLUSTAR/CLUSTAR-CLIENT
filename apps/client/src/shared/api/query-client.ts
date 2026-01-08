import { QueryClient } from '@tanstack/react-query';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: isDev || isTest ? false : 2,
        staleTime: 60 * 1000,
        throwOnError: true,
      },
    },
  });
}
