'use client';

import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';
import { RemoteErrorBoundary } from '@/microfrontends/remote-error-boundary';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';

const AddCreditsPage = loadRemoteModule('paymentApp', 'AddCreditsPage');

export default function AddCreditsSection() {
  return (
    <RemoteErrorBoundary remoteName="Add Credits">
      <AuthRemoteGate remoteLabel="Add Credits">
        <React.Suspense fallback={<div className="min-h-[calc(100dvh-60px)] animate-pulse bg-neutral-800/40" />}>
          <AddCreditsPage />
        </React.Suspense>
      </AuthRemoteGate>
    </RemoteErrorBoundary>
  );
}
