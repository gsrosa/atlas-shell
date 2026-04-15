import { memo, useEffect } from 'react';
import { useSession } from '@/features/auth/use-session';
import { trpc } from '@/shared/providers/query-provider';
import { useTravelerProfileUiStore } from './traveler-profile-store';

/** Keeps shell Zustand in sync with `travelerProfile.get` for nav awareness. */
export const TravelerProfileSync = memo(function TravelerProfileSync() {
  const { isAuthenticated, isLoading } = useSession();
  const setSnapshot = useTravelerProfileUiStore((s) => s.setSnapshot);

  const query = trpc.travelerProfile.get.useQuery(undefined, {
    enabled: Boolean(isAuthenticated && !isLoading),
    staleTime: 30_000,
    retry: 1,
  });

  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      setSnapshot(null);
      return;
    }
    if (query.data) {
      setSnapshot({ tier1Complete: query.data.tier1Complete });
    }
  }, [isAuthenticated, isLoading, query.data, setSnapshot]);

  return null;
});
