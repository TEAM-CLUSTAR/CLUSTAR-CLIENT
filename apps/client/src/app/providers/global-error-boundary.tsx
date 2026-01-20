import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from '@sentry/react';

import { ErrorPage } from '@pages/error';
import { LoadingPage } from '@pages/loading';

interface GlobalLayoutBoundaryProps {
  children: ReactNode;
}

export default function GlobalErrorBoundary({
  children,
}: GlobalLayoutBoundaryProps) {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
