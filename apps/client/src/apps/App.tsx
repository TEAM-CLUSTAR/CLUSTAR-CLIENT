import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';

import { ThemeProvider } from '@cds/ui';

import { createQueryClient } from '@shared/libs/query-client';
import { router } from '@shared/router/router';

function App() {
  const [client] = useState(() => createQueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
