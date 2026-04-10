# atlas-shell

MFE host application. Owns routing, layout, auth UI, and loads remote microfrontends.

## Dev
```bash
pnpm dev        # port 3000
pnpm typecheck  # tsc -b --noEmit
pnpm lint       # eslint
pnpm format     # prettier --write
```

## Architecture
- `src/app/router/` — `createBrowserRouter`, dynamically builds routes from `microfrontendRegistry`
- `src/microfrontends/registry/` — registry of all MFEs with feature flags + auth requirements
- `src/features/auth/` — session hook, login modal, auth-gated remote wrapper
- `src/components/` — shell layout, top-nav, bottom-nav, footer
- `src/shared/store/` — Zustand stores (`useShellStore`, `useAuthUiStore`)
- `src/config/feature-flags.ts` — `isFeatureEnabled(flag)` gates each MFE

## Module Federation
Configured in `vite.config.ts` via `@originjs/vite-plugin-federation`.
Remote URLs come from env vars (`VITE_*`), resolved in `module-federation/remotes.ts`.
Build target must be `esnext` for MF to work.

## Auth Pattern
```ts
// Check session anywhere
const { profile, isAuthenticated, isLoading } = useSession();

// Trigger login modal from any MFE
import { requestLogin } from '@/features/auth/auth-ui-store';
requestLogin(); // dispatches 'atlas:request-login' DOM event
```

## Adding a New MFE
1. Add entry to `microfrontendRegistry` in `src/microfrontends/registry/index.ts`
2. Add feature flag to `FeatureFlags` in `src/config/feature-flags.ts`
3. Add remote URL env var + update `module-federation/remotes.ts`
4. Add route constant to `src/shared/constants/shell-routes.ts`
