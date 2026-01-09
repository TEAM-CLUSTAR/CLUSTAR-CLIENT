import { QueryClient } from '@tanstack/react-query';

const isProd = process.env.NODE_ENV === 'production';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: isProd ? 2 : false,
        staleTime: 60 * 1000,
        throwOnError: true,
      },
    },
  });
}
