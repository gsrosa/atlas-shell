'use client';

import { AddCreditsPage } from '@/features/add-credits/add-credits-page';
import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';

export default function AddCreditsSection() {
  return (
    <AuthRemoteGate remoteLabel="Add Credits">
      <AddCreditsPage />
    </AuthRemoteGate>
  );
}
