import React from 'react';

import { monitoring } from '@/shared/services/monitoring';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

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

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-6 py-12 text-center bg-neutral-50 text-neutral-700"
          role="alert"
        >
          <h2 className="text-lg font-bold m-0">Something went wrong</h2>
          <p className="text-sm text-neutral-500 max-w-md m-0">
            {this.state.error?.message ??
              'An unexpected error occurred. Please try again.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 cursor-pointer border-none"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
