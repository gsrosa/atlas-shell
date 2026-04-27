'use client';

import { cn } from '@gsrosa/nexploring-ui';
import { useTranslation } from 'react-i18next';

import { useSession } from '@/features/auth/use-session';
import { trpc } from '@/lib/trpc';
import { SUPPORTED, persistLocale } from '@/lib/i18n';
import type { SupportedLocale } from '@/lib/i18n';

const LOCALES: { value: SupportedLocale; label: string }[] = [
  { value: 'en-US', label: 'EN' },
  { value: 'pt-BR', label: 'PT' },
  { value: 'es-ES', label: 'ES' },
];

export const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  const { isAuthenticated } = useSession();
  const updateMe = trpc.users.updateMe.useMutation();

  const current = (SUPPORTED as readonly string[]).includes(i18n.language)
    ? (i18n.language as SupportedLocale)
    : 'en-US';

  const handleChange = (locale: SupportedLocale) => {
    if (locale === current) return;

    // Apply immediately
    void i18n.changeLanguage(locale);

    // Persist via cookie so locale survives page reloads
    persistLocale(locale);

    // Notify all MFEs
    window.dispatchEvent(new CustomEvent('atlas:locale-changed', { detail: { locale } }));

    // Persist to user profile when logged in
    if (isAuthenticated) {
      updateMe.mutate({ preferred_locale: locale });
    }
  };

  return (
    <div
      className="flex shrink-0 items-center gap-0.5 rounded-full border border-white/10 p-0.5"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          suppressHydrationWarning
          aria-pressed={current === value}
          aria-label={`Switch to ${label}`}
          onClick={() => handleChange(value)}
          className={cn(
            'rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors',
            current === value
              ? 'bg-primary-500 text-white'
              : 'text-neutral-400 hover:text-neutral-100',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
