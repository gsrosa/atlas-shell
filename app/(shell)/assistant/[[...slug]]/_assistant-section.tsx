'use client';

import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';
import { RemoteErrorBoundary } from '@/microfrontends/remote-error-boundary';
import { UserAppRemoteSuspenseFallback } from '@/microfrontends/user-app-remote-suspense-fallback';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';

const AiAssistantApp = loadRemoteModule('aiAssistant', 'App');
const AiAssistantSkeleton = loadRemoteModule('aiAssistant', 'Skeleton');

const SkeletonFallback = () => (
  <React.Suspense fallback={<UserAppRemoteSuspenseFallback />}>
    <AiAssistantSkeleton />
  </React.Suspense>
);

export default function AssistantSection() {
  return (
    <RemoteErrorBoundary remoteName="AI Assistant">
      <AuthRemoteGate remoteLabel="AI Assistant" loadingFallback={<SkeletonFallback />}>
        <React.Suspense fallback={<SkeletonFallback />}>
          <AiAssistantApp />
        </React.Suspense>
      </AuthRemoteGate>
    </RemoteErrorBoundary>
  );
}
