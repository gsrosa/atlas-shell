type ErrorContext = {
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
};

const isDev = process.env.NODE_ENV !== 'production';

export const monitoring = {
  captureException(error: unknown, context?: ErrorContext): void {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.error('[Monitoring] Exception:', error, context);
    }
  },

  captureMessage(
    message: string,
    level: 'info' | 'warning' | 'error' = 'info',
  ): void {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.debug(`[Monitoring] ${level}:`, message);
    }
  },

  setUser(userId: string): void {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.debug('[Monitoring] Set user:', userId);
    }
  },
};
