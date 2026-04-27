'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@gsrosa/nexploring-ui';
import { MapPinOffIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation('common');
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-6">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/10 text-primary-400">
          <MapPinOffIcon className="size-7" strokeWidth={1.5} aria-hidden />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">
            {t('notFound.badge')}
          </p>
          <h1 className="text-2xl font-bold text-neutral-100">
            {t('notFound.title')}
          </h1>
          <p className="text-sm text-neutral-300">
            {t('notFound.body', { path: pathname })}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild variant="primary" size="md">
            <Link href="/">{t('notFound.backToHome')}</Link>
          </Button>
          <Button asChild variant="ghost" size="md">
            <Link href="/assistant">{t('notFound.planTrip')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
