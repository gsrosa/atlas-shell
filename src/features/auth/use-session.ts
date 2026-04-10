import { isTRPCClientError } from '@trpc/client';

import { trpc } from '@/shared/providers/query-provider';

export function useSession() {
  const me = trpc.users.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: true,
  });

  const isAuthenticated = me.isSuccess;
  const isLoading = me.isPending;
  const isUnauthorized =
    me.isError &&
    isTRPCClientError(me.error) &&
    me.error.data?.code === 'UNAUTHORIZED';

  return {
    /** Row from `users.me` (includes `email`, `display_name`, etc.) */
    profile: me.data?.profile ?? null,
    isAuthenticated,
    /** True while the first session check is in flight */
    isLoading,
    isUnauthorized,
    refetch: me.refetch,
  };
}
