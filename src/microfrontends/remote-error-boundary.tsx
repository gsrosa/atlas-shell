import React from 'react';

import { monitoring } from '@/shared/services/monitoring';

type Props = {
  remoteName: string;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

/** React requires class components for error boundaries — this is the one allowed exception. */
export class RemoteErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    monitoring.captureException(error, {
      component: 'RemoteErrorBoundary',
      action: `loading ${this.props.remoteName}`,
      metadata: { componentStack: info.componentStack },
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-[calc(100vh-50px)] flex flex-col items-center justify-center gap-4 px-6 py-12 text-center bg-neutral-50 text-neutral-700"
          role="alert"
        >
          <h2 className="text-lg font-bold m-0">
            Failed to load {this.props.remoteName}
          </h2>
          <p className="text-sm text-neutral-500 max-w-md m-0">
            {this.state.error?.message ??
              'The application could not be loaded. It may be temporarily unavailable.'}
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 cursor-pointer border-none"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
