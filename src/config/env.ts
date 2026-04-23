type EnvConfig = {
  DEV: boolean;
  PROD: boolean;
  API_URL: string;
  REMOTE_AI_ASSISTANT_URL: string;
  REMOTE_USER_APP_URL: string;
  REMOTE_PAYMENT_APP_URL: string;
};

const get = (key: string, fallback: string): string =>
  (process.env[key] as string | undefined) ?? fallback;

export const env: EnvConfig = {
  DEV: process.env.NODE_ENV !== 'production',
  PROD: process.env.NODE_ENV === 'production',
  API_URL: get('NEXT_PUBLIC_API_URL', 'http://localhost:4000'),
  REMOTE_AI_ASSISTANT_URL: get(
    'NEXT_PUBLIC_REMOTE_AI_ASSISTANT_URL',
    'http://localhost:3002/remoteEntry.js',
  ),
  REMOTE_USER_APP_URL: get(
    'NEXT_PUBLIC_REMOTE_USER_APP_URL',
    'http://localhost:3003/remoteEntry.js',
  ),
  REMOTE_PAYMENT_APP_URL: get(
    'NEXT_PUBLIC_REMOTE_PAYMENT_APP_URL',
    'http://localhost:3004/remoteEntry.js',
  ),
};
