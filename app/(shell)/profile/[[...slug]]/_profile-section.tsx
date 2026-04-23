'use client';

import React from 'react';

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';

const ProfileLayout = loadRemoteModule('userApp', 'ProfileLayout');
const ProfileAboutPage = loadRemoteModule('userApp', 'ProfileAboutPage');
const ProfilePasswordPage = loadRemoteModule('userApp', 'ProfilePasswordPage');
const ProfilePreferencesPage = loadRemoteModule('userApp', 'ProfilePreferencesPage');
const BillingPage = loadRemoteModule('paymentApp', 'BillingPage');

const profileLayoutSkeleton = (
  <div className="flex min-h-[calc(100dvh-60px)] w-full animate-pulse flex-col gap-0 bg-neutral-800/40 md:flex-row">
    <div className="w-56 shrink-0 border-r border-neutral-700 bg-neutral-800" />
    <div className="flex-1 p-10">
      <div className="mb-4 h-6 w-48 rounded-lg bg-neutral-700" />
      <div className="h-4 w-72 rounded bg-neutral-700" />
    </div>
  </div>
);

// createBrowserRouter reads window.location — safe here because this file is
// only ever imported client-side (via dynamic({ ssr: false })).
const profileRouter = createBrowserRouter([
  {
    path: '/profile',
    element: (
      <React.Suspense fallback={profileLayoutSkeleton}>
        <ProfileLayout />
      </React.Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/profile/about" replace /> },
      {
        path: 'about',
        element: (
          <React.Suspense fallback={null}>
            <ProfileAboutPage />
          </React.Suspense>
        ),
      },
      {
        path: 'password',
        element: (
          <React.Suspense fallback={null}>
            <ProfilePasswordPage />
          </React.Suspense>
        ),
      },
      {
        path: 'billing',
        element: (
          <React.Suspense fallback={null}>
            <BillingPage />
          </React.Suspense>
        ),
      },
      {
        path: 'preferences',
        element: (
          <React.Suspense fallback={null}>
            <ProfilePreferencesPage />
          </React.Suspense>
        ),
      },
    ],
  },
]);

export default function ProfileSection() {
  return (
    <AuthRemoteGate remoteLabel="Profile" loadingFallback={profileLayoutSkeleton}>
      <RouterProvider router={profileRouter} />
    </AuthRemoteGate>
  );
}
