import { Suspense } from 'react';
import { ErrorBoundary } from '@sentry/react';
import { Outlet } from 'react-router';

export default function GlobalLayout() {
  return (
    <ErrorBoundary fallback={<p>error-page</p>}>
      <Suspense fallback={<p>loading...</p>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
