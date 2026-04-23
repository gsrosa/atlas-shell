import { AtlasProvider } from '@gsrosa/atlas-ui';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';

import { ShellLayout } from '@/components/shell-layout';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en-US', changeLanguage: vi.fn() },
  }),
}));

vi.mock('@/features/traveler-profile/traveler-profile-sync', () => ({
  TravelerProfileSync: () => null,
}));

vi.mock('@/components/purchase-modal', () => ({
  PurchaseModal: () => null,
}));

vi.mock('@/components/footer', () => ({
  Footer: () => (
    <footer>
      <span>Footer</span>
    </footer>
  ),
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({
    isAuthenticated: false,
    isLoading: false,
    profile: null,
    isUnauthorized: false,
    refetch: vi.fn(),
  }),
}));

vi.mock('@/features/auth/auth-ui-store', () => ({
  useAuthUiStore: (selector: (s: { openLogin: () => void }) => unknown) =>
    selector({ openLogin: vi.fn() }),
}));

vi.mock('@/lib/trpc', () => ({
  trpc: {
    useUtils: () => ({}),
    auth: {
      signOut: {
        useMutation: () => ({ mutate: vi.fn(), isPending: false }),
      },
    },
  },
}));

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ShellLayout', () => {
  it('should have no serious accessibility violations when the outlet renders placeholder content', async () => {
    const { container } = render(
      <AtlasProvider>
        <ShellLayout>
          <div>Page content</div>
        </ShellLayout>
      </AtlasProvider>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
