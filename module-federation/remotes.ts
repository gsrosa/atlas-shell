const REMOTE_DEFAULTS = {
  aiAssistant: 'http://localhost:3002/remoteEntry.js',
  userApp: 'http://localhost:3003/remoteEntry.js',
  paymentApp: 'http://localhost:3004/remoteEntry.js',
} as const;

export function buildRemotes(envVars: Record<string, string> = {}) {
  return {
    aiAssistant:
      envVars.VITE_REMOTE_AI_ASSISTANT_URL ?? REMOTE_DEFAULTS.aiAssistant,
    userApp: envVars.VITE_REMOTE_USER_APP_URL ?? REMOTE_DEFAULTS.userApp,
    paymentApp:
      envVars.VITE_REMOTE_PAYMENT_APP_URL ?? REMOTE_DEFAULTS.paymentApp,
  };
}
