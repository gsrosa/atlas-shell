import { Component, Suspense } from 'react';
import type { ComponentType, ErrorInfo, LazyExoticComponent, ReactNode } from 'react';
import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';
import { RemoteErrorBoundary } from './remote-error-boundary';

interface RemoteRouteProps {
  name: string;
  module: LazyExoticComponent<ComponentType>;
  skeleton?: LazyExoticComponent<ComponentType>;
  requireAuth?: boolean;
}

function PageShimmer() {
  return (
    <div className="min-h-[calc(100dvh-60px)] animate-pulse bg-neutral-100 dark:bg-neutral-900 md:min-h-screen" />
  );
}

function DefaultSpinner() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-6 text-sm text-neutral-500">
      <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-400" />
      Loading remote…
    </div>
  );
}

/** Silently swallows skeleton load errors — falls back to the plain shimmer. */
class SkeletonErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // intentionally silent — skeleton failures are non-critical
  }

  render() {
    if (this.state.failed) return <PageShimmer />;
    return this.props.children;
  }
}

function buildFallback(Skeleton?: LazyExoticComponent<ComponentType>): ReactNode {
  if (!Skeleton) return <DefaultSpinner />;
  return (
    <SkeletonErrorBoundary>
      <Suspense fallback={<PageShimmer />}>
        <Skeleton />
      </Suspense>
    </SkeletonErrorBoundary>
  );
}

export function RemoteRoute({ name, module: Module, skeleton, requireAuth }: RemoteRouteProps) {
  const fallback = buildFallback(skeleton);

  const remote = (
    <Suspense fallback={fallback}>
      <Module />
    </Suspense>
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
}
