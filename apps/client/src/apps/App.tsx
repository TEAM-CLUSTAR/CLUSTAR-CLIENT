import { Button } from '@cds/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { createQueryClient } from '../shared/utils/query-client'; //@TODO 절대경로 바꾸기

function App() {
  const [client] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={client}>
      <Button />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
