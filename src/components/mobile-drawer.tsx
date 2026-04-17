import React from 'react';

import { cn } from '@gsrosa/atlas-ui';
import {
  CompassIcon,
  MapIcon,
  SparklesIcon,
  XIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { isFeatureEnabled } from '@/config/feature-flags';
import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const drawerNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium no-underline transition-colors',
    isActive
      ? 'bg-primary-500/15 text-primary-400'
      : 'text-neutral-300 hover:bg-white/6 hover:text-neutral-100',
  );

export const MobileDrawer = ({ isOpen, onClose }: Props) => {
  const { isAuthenticated, isLoading } = useSession();
  const openLogin = useAuthUiStore((s) => s.openLogin);
  const aiAssistant = isFeatureEnabled('enableAIAssistant');
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Focus first nav item on open
  React.useEffect(() => {
    if (isOpen) {
      const first = panelRef.current?.querySelector<HTMLElement>('a, button');
      first?.focus();
    }
  }, [isOpen]);

  const handleAuthNavClick = (e: React.MouseEvent) => {
    if (!isAuthenticated && !isLoading) {
      e.preventDefault();
      onClose();
      openLogin();
    } else {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Drawer panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-neutral-900 shadow-xl transition-transform duration-200 ease-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/6 px-4 py-3">
          <span className="text-sm font-bold tracking-[0.08em] text-neutral-50">
            ATLAS <span className="font-normal text-primary-500">AI</span>
          </span>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/8 hover:text-neutral-100"
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        </div>

        {/* Nav items */}
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 p-3">
          <NavLink to={ROUTES.HOME} end className={drawerNavLinkClass} onClick={onClose}>
            <CompassIcon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            Explore
          </NavLink>

          <NavLink
            to={ROUTES.ASSISTANT}
            className={drawerNavLinkClass}
            onClick={handleAuthNavClick}
          >
            <SparklesIcon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            Plan Trip
          </NavLink>

          <NavLink
            to={ROUTES.MY_TRIPS}
            className={cn(
              drawerNavLinkClass({ isActive: false }),
              !aiAssistant && 'cursor-not-allowed opacity-40',
            )}
            onClick={aiAssistant ? handleAuthNavClick : (e) => e.preventDefault()}
            aria-disabled={!aiAssistant}
          >
            <MapIcon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            My Trips
            {!aiAssistant && (
              <span className="ml-auto rounded-full bg-neutral-300/10 px-1.5 py-px text-[9px] font-semibold uppercase tracking-widest text-neutral-500">
                Soon
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </>
  );
};
