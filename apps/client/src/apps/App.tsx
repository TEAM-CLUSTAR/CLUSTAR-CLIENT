import { Button } from '@cds/ui';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, Suspense } from 'react';
import { createQueryClient } from '../shared/api/query-client'; //@TODO 절대경로 바꾸기
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const [client] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ErrorBoundary fallback={<h1>에러 발생</h1>}>
        <Suspense fallback={<h1>로딩 중..</h1>}>
          <Button />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
