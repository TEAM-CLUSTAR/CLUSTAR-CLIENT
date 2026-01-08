import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { createQueryClient } from '@shared/api/query-client';
import { router } from '@shared/router/router';
import { RouterProvider } from 'react-router';

function App() {
  const [client] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
