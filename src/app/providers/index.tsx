import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './QueryProvider';
import { ErrorBoundary } from './ErrorBoundary';
import { router } from '@/app/router';

export function AppProviders() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ErrorBoundary>
  );
}
