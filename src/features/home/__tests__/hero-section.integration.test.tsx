import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { HeroSection } from '@/features/home/components/hero-section';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({
    isAuthenticated: false,
    isLoading: false,
    profile: null,
  }),
}));

const openLogin = vi.fn();

vi.mock('@/features/auth/auth-ui-store', () => ({
  useAuthUiStore: (selector: (state: { openLogin: () => void }) => unknown) =>
    selector({ openLogin }),
}));

describe('HeroSection (integration)', () => {
  it('should show the hero headline and primary CTA when the session is idle', () => {
    render(<HeroSection />);

    expect(
      screen.getByRole('heading', {
        name: /Your trips, planned by artificial intelligence that understands you/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start planning free/i })).toBeInTheDocument();
  });
});
