import { Suspense } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { RemoteErrorBoundary } from './RemoteErrorBoundary';

interface RemoteRouteProps {
  name: string;
  module: LazyExoticComponent<ComponentType>;
}

function LoadingFallback() {
  return <div className="loading-container">Loading...</div>;
}

export function RemoteRoute({ name, module: Module }: RemoteRouteProps) {
  return (
    <RemoteErrorBoundary remoteName={name}>
      <Suspense fallback={<LoadingFallback />}>
        <Module />
      </Suspense>
    </RemoteErrorBoundary>
  );
}
