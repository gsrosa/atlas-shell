'use client';

import dynamic from 'next/dynamic';

const AssistantSection = dynamic(() => import('./_assistant-section'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[calc(100dvh-60px)] animate-pulse bg-neutral-800/40 md:min-h-screen" />
  ),
});

export default function AssistantPage() {
  return <AssistantSection />;
}
