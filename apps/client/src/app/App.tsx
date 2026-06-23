import { useState } from 'react';
import { router } from '@router/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';

import { ThemeProvider } from '@cds/ui';

import { createQueryClient } from '@shared/libs/query-client';

import GlobalErrorBoundary from './providers/global-error-boundary';

function App() {
  const [client] = useState(() => createQueryClient());

  return (
    <ThemeProvider>
      <GlobalErrorBoundary>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GlobalErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
