import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from '@sentry/react';

interface GlobalLayoutBoundaryProps {
  children: ReactNode;
}
export default function GlobalErrorBoundary({
  children,
}: GlobalLayoutBoundaryProps) {
  return (
    <ErrorBoundary fallback={<p>error-page</p>}>
      <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
