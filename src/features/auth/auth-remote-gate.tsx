'use client';

import React from 'react';

import { Alert, AlertDescription, AlertTitle, Button } from '@gsrosa/nexploring-ui';
import { AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';

type Props = {
  remoteLabel: string;
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
};

const AuthErrorScreen = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { t } = useTranslation('common');
  const openLogin = useAuthUiStore((s) => s.openLogin);

  return (
    <div
      className="flex min-h-[min(70vh,560px)] flex-col items-center justify-center px-4 py-12 sm:px-6"
      role="alert"
      aria-live="polite"
    >
      <div className="w-full max-w-md">
        <Alert variant="danger" className="flex flex-col gap-3 border text-left sm:flex-row sm:items-start">
          <AlertTriangleIcon
            className="size-10 shrink-0 text-danger-600 sm:size-9"
            aria-hidden
            strokeWidth={2}
          />
          <div className="min-w-0 flex-1 space-y-2">
            <AlertTitle className="text-base text-danger-800">{title}</AlertTitle>
            <AlertDescription className="text-danger-700">{description}</AlertDescription>
            <p className="m-0 pt-1 font-mono text-xs text-danger-600 opacity-90">
              {t('auth.authErrorFooter')}
            </p>
          </div>
        </Alert>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Button type="button" variant="secondary" className="w-full sm:w-auto" asChild>
            <Link href={ROUTES.HOME} className="no-underline">
              {t('auth.backToHome')}
            </Link>
          </Button>
          <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={openLogin}>
            {t('nav.signIn')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AuthRemoteGate = ({ remoteLabel, children, loadingFallback }: Props) => {
  const { t } = useTranslation('common');
  const { isAuthenticated, isLoading, isUnauthorized } = useSession();

  if (isLoading) {
    return loadingFallback ?? (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-6 text-sm text-neutral-500">
        <span className="inline-block size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-400" />
        {t('auth.checkingSession')}
      </div>
    );
  }

  if (!isAuthenticated && isUnauthorized) {
    return (
      <AuthErrorScreen
        title={t('auth.accessDenied')}
        description={t('auth.accessDeniedDescription', { name: remoteLabel })}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthErrorScreen
        title={t('auth.sessionError')}
        description={t('auth.sessionErrorDescription')}
      />
    );
  }

  return children;
};
