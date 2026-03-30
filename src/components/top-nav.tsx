import { Settings } from 'lucide-react';
import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { isFeatureEnabled } from '@/config/feature-flags';
import { ROUTES } from '@/shared/constants/shell-routes';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
  disabled?: boolean;
}

function buildNavItems(): NavItem[] {
  const userApp = isFeatureEnabled('enableUserApp');
  return [
    { to: ROUTES.HOME, label: 'Home', end: true },
    { to: ROUTES.ASSISTANT, label: 'Plan Trip' },
    {
      to: ROUTES.USER,
      label: 'My Plans',
      disabled: !userApp,
    },
  ];
}

/** Logo — no route-active styling; memoized so it does not re-render on path changes. */
const TopNavBrand = memo(function TopNavBrand() {
  return (
    <Link
      to="/"
      aria-label="Atlas home"
      className="flex shrink-0 items-center no-underline"
    >
      <img
        src="/atlas-logo.svg"
        alt=""
        width={120}
        height={32}
        className="h-8 w-auto max-w-[min(42vw,140px)] object-contain object-left sm:h-9 sm:max-w-none"
        decoding="async"
      />
    </Link>
  );
});

/** Same chrome on all breakpoints: desktop row + compact account on small screens (CSS only). */
function TopNavActions() {
  const NAV_ITEMS = buildNavItems();
  const userApp = isFeatureEnabled('enableUserApp');

  return (
    <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
      <nav
        aria-label="Main navigation"
        className="hidden min-w-0 items-center justify-end gap-0.5 overflow-x-auto py-0.5 no-scrollbar md:flex lg:gap-1"
      >
        {NAV_ITEMS.map((item) =>
          item.disabled ? (
            <span
              key={item.to}
              aria-disabled="true"
              className="inline-flex shrink-0 cursor-not-allowed select-none items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium whitespace-nowrap text-neutral-600 opacity-50 lg:px-3 lg:text-sm"
            >
              {item.label}
              <span className="inline-flex items-center rounded-full bg-neutral-200 px-1.5 py-px text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
                Soon
              </span>
            </span>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end ?? false}
              className={({ isActive }) =>
                `inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs whitespace-nowrap no-underline lg:px-3 lg:text-sm ${
                  isActive
                    ? 'bg-primary-50 font-semibold text-primary-400'
                    : 'font-medium text-neutral-600 hover:bg-neutral-200 hover:text-neutral-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ),
        )}
      </nav>

      {userApp ? (
        <NavLink
          to={ROUTES.USER}
          aria-label="Open account"
          className="flex shrink-0 items-center justify-center gap-2 no-underline md:max-w-[min(200px,28vw)] md:rounded-[10px] md:border md:border-neutral-200 md:bg-neutral-50 md:px-2.5 md:py-1.5 md:hover:border-primary-200 md:hover:bg-primary-50/80 [&_svg]:shrink-0"
        >
          <span className="flex size-[34px] items-center justify-center rounded-full border-2 border-primary-200 bg-primary-50 text-[13px] font-bold text-primary-400 md:hidden">
            G
          </span>
          <span className="hidden size-7 shrink-0 items-center justify-center rounded-full border-2 border-primary-200 bg-primary-50 text-[11px] font-bold text-primary-400 md:flex">
            G
          </span>
          <span className="hidden min-w-0 flex-col overflow-hidden text-left md:flex">
            <span className="truncate text-[12px] font-bold leading-tight text-neutral-700">Account</span>
            <span className="truncate text-[10px] leading-tight text-neutral-500">Plans & profile</span>
          </span>
          <Settings aria-hidden className="hidden size-[18px] shrink-0 text-neutral-500 md:block" strokeWidth={2} />
        </NavLink>
      ) : null}
    </div>
  );
}

export const TopNav = memo(function TopNav() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-30 shrink-0 border-b border-white/6 bg-[#111317] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
    >
      <div className="flex min-h-[52px] w-full min-w-0 items-center gap-2 px-3 py-1.5 sm:gap-3 sm:px-4 md:min-h-[60px] md:px-6 lg:min-h-16 lg:px-10 lg:py-0">
        <TopNavBrand />
        <TopNavActions />
      </div>
    </header>
  );
});
