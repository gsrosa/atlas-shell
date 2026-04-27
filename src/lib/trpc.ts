import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@/trpc/types';


export const trpc = createTRPCReact<AppRouter>();
