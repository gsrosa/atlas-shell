'use client';

import React from 'react';

import { TriangleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { monitoring } from '@/shared/services/monitoring';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

function AppErrorContent({ onGoHome }: { onGoHome: () => void }) {
  const { t } = useTranslation('common');
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-12 text-center bg-neutral-900 text-neutral-100"
      role="alert"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 text-primary-400">
        <TriangleAlert size={32} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold m-0">{t('error.appTitle')}</h1>
        <p className="text-sm text-neutral-400 max-w-sm m-0">
          {t('error.appBody')}
        </p>
      </div>
      <button
        type="button"
        onClick={onGoHome}
        className="rounded-xl bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 cursor-pointer border-none"
      >
        {t('error.goHome')}
      </button>
    </div>
  );
}

/** React requires class components for error boundaries — this is the one allowed exception. */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    monitoring.captureException(error, {
      component: 'ErrorBoundary',
      metadata: { componentStack: info.componentStack },
    });
  }

  private handleGoHome = () => {
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <AppErrorContent onGoHome={this.handleGoHome} />;
    }

    return this.props.children;
  }
}
