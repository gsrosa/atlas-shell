'use client';

import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';
import { AddCreditsPage } from '@/features/add-credits/add-credits-page';

export default function AddCreditsSection() {
  return (
    <AuthRemoteGate remoteLabel="Add Credits">
      <AddCreditsPage />
    </AuthRemoteGate>
  );
}
