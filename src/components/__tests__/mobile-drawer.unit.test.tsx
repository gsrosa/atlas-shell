import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('react-router-dom', () => ({
  NavLink: ({
    children,
    className,
    onClick,
    to,
  }: {
    children: React.ReactNode;
    className: (({ isActive }: { isActive: boolean }) => string) | string;
    onClick?: React.MouseEventHandler;
    to: string;
  }) => (
    <a
      href={to}
      onClick={onClick}
      className={typeof className === 'function' ? className({ isActive: false }) : className}
    >
      {children}
    </a>
  ),
}));

vi.mock('@/config/feature-flags', () => ({
  isFeatureEnabled: (flag: string) => flag !== 'enableSearchApp',
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({ isAuthenticated: false, isLoading: false }),
}));

vi.mock('@/features/auth/auth-ui-store', () => ({
  useAuthUiStore: (selector: (s: { openLogin: () => void }) => unknown) =>
    selector({ openLogin: vi.fn() }),
}));

vi.mock('@gsrosa/atlas-ui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@gsrosa/atlas-ui')>();
  return { ...actual, cn: (...args: unknown[]) => args.filter(Boolean).join(' ') };
});

import { MobileDrawer } from '../mobile-drawer';

// ── Tests ──────────────────────────────────────────────────────────────────

describe('MobileDrawer', () => {
  it('is hidden when isOpen is false', () => {
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={false} onClose={onClose} />);

    const panel = screen.getByRole('dialog', { name: /navigation menu/i });
    expect(panel.className).toContain('-translate-x-full');
  });

  it('is visible when isOpen is true', () => {
    render(<MobileDrawer isOpen={true} onClose={vi.fn()} />);

    const panel = screen.getByRole('dialog', { name: /navigation menu/i });
    expect(panel.className).toContain('translate-x-0');
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={true} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /close navigation menu/i }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={true} onClose={onClose} />);

    // Backdrop is aria-hidden; find it by its position (first div sibling of the panel)
    const backdrop = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={true} onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose on Escape when drawer is closed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={false} onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders nav items: Explore, Plan Trip, My Trips', () => {
    render(<MobileDrawer isOpen={true} onClose={vi.fn()} />);

    const nav = screen.getByRole('navigation', { name: /mobile navigation/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /plan trip/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /my trips/i })).toBeInTheDocument();
  });
});
