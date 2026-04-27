'use client';

import React, { type ReactNode, useEffect } from 'react';

import { NexploringProvider } from '@gsrosa/nexploring-ui';

import '@/lib/i18n';
import i18n, { getPersistedLocale, persistLocale, SUPPORTED, type SupportedLocale } from '@/lib/i18n';
import { AuthShellEffects } from '@/features/auth/auth-shell-effects';
import { LoginModal } from '@/features/auth/login-modal';
import { SignUpModal } from '@/features/auth/signup-modal';
import { useSession } from '@/features/auth/use-session';

import { ErrorBoundary } from './error-boundary';
import { QueryProvider } from './query-provider';

// Applies the user's locale after hydration. i18n always initialises with 'en-US'
// so SSR and client first-render produce the same text (no hydration mismatch).
// Since all locales are bundled, changeLanguage() is synchronous — no visible flash.
function LocaleSync() {
  useEffect(() => {
    const locale = getPersistedLocale();
    if (locale !== i18n.language) {
      void i18n.changeLanguage(locale);
      window.dispatchEvent(new CustomEvent('atlas:locale-changed', { detail: { locale } }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

// Applies the user's saved preferred_locale from their profile when they log in.
// Runs inside QueryProvider so useSession() (tRPC) is available.
function LocaleProfileSync() {
  const { profile } = useSession();

  useEffect(() => {
    const locale = profile?.preferred_locale;
    if (locale && (SUPPORTED as readonly string[]).includes(locale) && locale !== i18n.language) {
      const typed = locale as SupportedLocale;
      void i18n.changeLanguage(typed);
      persistLocale(typed);
      window.dispatchEvent(new CustomEvent('atlas:locale-changed', { detail: { locale: typed } }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.preferred_locale]);

  return null;
}

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NexploringProvider>
      <ErrorBoundary>
        <QueryProvider>
          <LocaleSync />
          <LocaleProfileSync />
          <AuthShellEffects />
          <LoginModal />
          <SignUpModal />
          {children}
        </QueryProvider>
      </ErrorBoundary>
    </NexploringProvider>
  );
};
