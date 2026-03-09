import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { monitoring } from '@/services/monitoring';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
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
        <div className="error-container" role="alert">
          <h2>Something went wrong</h2>
          <p>
            {this.state.error?.message ??
              'An unexpected error occurred. Please try again.'}
          </p>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
