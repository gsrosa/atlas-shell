/**
 * Shell routing smoke tests.
 *
 * With Next.js App Router, routing is file-system–based and not testable via
 * `createMemoryRouter`. Instead we test that the key page-level components
 * render without crashing and produce the expected landmark content.
 */
import { NexploringProvider } from '@gsrosa/nexploring-ui';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

vi.mock('@/features/traveler-profile/traveler-profile-sync', () => ({
  TravelerProfileSync: () => null,
}));

vi.mock('@/components/purchase-modal', () => ({
  PurchaseModal: () => null,
}));

vi.mock('@/components/footer', () => ({
  Footer: () => <footer><span>Footer</span></footer>,
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({
    isAuthenticated: true,
    isLoading: false,
    profile: {
      id: 'u1',
      first_name: 'Alex',
      last_name: 'River',
      email: 'alex@example.com',
      display_name: null,
    },
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
    useUtils: () => ({
      users: { me: { invalidate: vi.fn() } },
      travelerProfile: { get: { invalidate: vi.fn() } },
    }),
    auth: {
      signOut: {
        useMutation: () => ({ mutate: vi.fn(), isPending: false }),
      },
    },
  },
}));

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ShellLayout', () => {
  it('renders the shell chrome (header, main, nav) around page content', () => {
    render(
      <NexploringProvider>
        <ShellLayout>
          <div data-testid="page-content">Page content</div>
        </ShellLayout>
      </NexploringProvider>,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // <header>
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('renders the mobile nav bar', () => {
    render(
      <NexploringProvider>
        <ShellLayout>
          <div>content</div>
        </ShellLayout>
      </NexploringProvider>,
    );

    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
  });
});
