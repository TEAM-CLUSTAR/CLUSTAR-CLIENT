import { useState } from 'react';
import { router } from '@router/router';
import { ErrorBoundary } from '@sentry/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';

import { ThemeProvider } from '@cds/ui';

import ErrorFallback from '@shared/components/error-fallback/error-fallback';
import { createQueryClient } from '@shared/libs/query-client';

function App() {
  const [client] = useState(() => createQueryClient());

  return (
    <ThemeProvider>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
