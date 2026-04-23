'use client';

import dynamic from 'next/dynamic';

// Profile section uses React Router internally (ProfileLayout uses <Outlet />).
// Load client-only to avoid SSR issues with createBrowserRouter.
const ProfileSection = dynamic(() => import('./_profile-section'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[calc(100dvh-60px)] w-full animate-pulse flex-col gap-0 bg-neutral-800/40 md:flex-row">
      <div className="w-56 shrink-0 border-r border-neutral-700 bg-neutral-800" />
      <div className="flex-1 p-10">
        <div className="mb-4 h-6 w-48 rounded-lg bg-neutral-700" />
        <div className="h-4 w-72 rounded bg-neutral-700" />
      </div>
    </div>
  ),
});

export default function ProfilePage() {
  return <ProfileSection />;
}
