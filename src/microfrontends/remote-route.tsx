import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';

import { RemoteErrorBoundary } from './remote-error-boundary';

type RemoteRouteProps = {
  name: string;
  module: React.LazyExoticComponent<React.ComponentType>;
  skeleton?: React.LazyExoticComponent<React.ComponentType>;
  requireAuth?: boolean;
};

const PageShimmer = () => {
  return (
    <div className="min-h-[calc(100dvh-60px)] animate-pulse bg-neutral-100 dark:bg-neutral-900 md:min-h-screen" />
  );
};

const DefaultSpinner = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-6 text-sm text-neutral-500">
      <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-400" />
      Loading remote…
    </div>
  );
};

/** React requires class components for error boundaries — this is the one allowed exception. */
class SkeletonErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: React.ErrorInfo): void {
    // intentionally silent — skeleton failures are non-critical
  }

  render() {
    if (this.state.failed) return <PageShimmer />;
    return this.props.children;
  }
}

const buildFallback = (Skeleton?: React.LazyExoticComponent<React.ComponentType>): React.ReactNode => {
  if (!Skeleton) return <DefaultSpinner />;
  return (
    <SkeletonErrorBoundary>
      <React.Suspense fallback={<PageShimmer />}>
        <Skeleton />
      </React.Suspense>
    </SkeletonErrorBoundary>
  );
};

export const RemoteRoute = ({ name, module: Module, skeleton, requireAuth }: RemoteRouteProps) => {
  const fallback = buildFallback(skeleton);

  const remote = (
    <React.Suspense fallback={fallback}>
      <Module />
    </React.Suspense>
  );

  return (
    <RemoteErrorBoundary remoteName={name}>
      {requireAuth ? (
        <AuthRemoteGate remoteLabel={name} loadingFallback={fallback}>
          {remote}
        </AuthRemoteGate>
      ) : remote}
    </RemoteErrorBoundary>
  );
};
