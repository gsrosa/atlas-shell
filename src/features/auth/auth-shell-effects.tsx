import { useEffect } from 'react';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';

/** Listens for `atlas:request-login` so microfrontends can open the shell login modal. */
export function AuthShellEffects() {
  useEffect(() => {
    const onRequest = () => {
      useAuthUiStore.getState().openLogin();
    };
    window.addEventListener('atlas:request-login', onRequest);
    return () => window.removeEventListener('atlas:request-login', onRequest);
  }, []);
  return null;
}
