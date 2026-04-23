'use client';

import dynamic from 'next/dynamic';

// Client-only: MFE runtime loader uses document/window APIs.
const AddCreditsSection = dynamic(() => import('./_add-credits-section'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[calc(100dvh-60px)] animate-pulse bg-neutral-800/40" />
  ),
});

export default function AddCreditsPage() {
  return <AddCreditsSection />;
}
