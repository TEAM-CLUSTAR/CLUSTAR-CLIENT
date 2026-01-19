import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from '@sentry/react';

import { ErrorPage } from '@pages/error';

interface GlobalLayoutBoundaryProps {
  children: ReactNode;
}
export default function GlobalErrorBoundary({
  children,
}: GlobalLayoutBoundaryProps) {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
