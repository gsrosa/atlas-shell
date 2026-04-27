type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

const isDev = process.env.NODE_ENV !== 'production';

export const analytics = {
  track(event: AnalyticsEvent): void {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.debug('[Analytics]', event.name, event.properties);
    }
  },

  page(path: string): void {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.debug('[Analytics] Page view:', path);
    }
  },

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.debug('[Analytics] Identify:', userId, traits);
    }
  },
};
