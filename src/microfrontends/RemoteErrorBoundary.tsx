import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { monitoring } from '@/services/monitoring';

interface Props {
  remoteName: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class RemoteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
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
        <div className="remote-error" role="alert">
          <h2>Failed to load {this.props.remoteName}</h2>
          <p>
            {this.state.error?.message ??
              'The application could not be loaded. It may be temporarily unavailable.'}
          </p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}
