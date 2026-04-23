type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

const isDev = process.env.NODE_ENV !== 'production';

export const analytics = {
  track(event: AnalyticsEvent): void {
    if (isDev) {
      console.debug('[Analytics]', event.name, event.properties);
    }
  },

  page(path: string): void {
    if (isDev) {
      console.debug('[Analytics] Page view:', path);
    }
  },

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (isDev) {
      console.debug('[Analytics] Identify:', userId, traits);
    }
  },
};
