'use client';

import { cn } from '@gsrosa/nexploring-ui';
import { useTranslation } from 'react-i18next';

import { useCreditsStore } from '@/features/credits/credits-store';

import type { CreditBundle } from '@/shared/constants/credits';
import { CREDIT_BUNDLES } from '@/shared/constants/credits';

type Props = {
  selected: CreditBundle | null;
  onSelect: (bundle: CreditBundle) => void;
};

const formatPrice = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    cents / 100,
  );

export const BundlePicker = ({ selected, onSelect }: Props) => {
  const { t } = useTranslation('payment');
  const balance = useCreditsStore((s) => s.balance);

  return (
    <div className="flex flex-col gap-3">
      {CREDIT_BUNDLES.map((bundle) => {
        const isSelected = selected?.id === bundle.id;

        return (
          <button
            key={bundle.id}
            type="button"
            onClick={() => onSelect(bundle)}
            className={cn(
              'group relative flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
              isSelected
                ? 'border-primary-500/60 bg-primary-500/8 shadow-[0_0_0_1px_rgba(255,87,34,0.2),0_4px_20px_rgba(255,87,34,0.10)]'
                : 'border-white/8 bg-neutral-800/50 hover:border-white/14 hover:bg-neutral-800',
            )}
          >
            {/* Text */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    isSelected ? 'text-neutral-50' : 'text-neutral-200',
                  )}
                >
                  {t(`bundle.${bundle.id}.label`)}
                </span>
                {bundle.highlight && (
                  <span className="inline-flex items-center rounded-full bg-primary-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-400 ring-1 ring-primary-500/30">
                    {t('bundle.bestValue')}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  'mt-0.5 text-xs',
                  isSelected ? 'text-neutral-300' : 'text-neutral-500',
                )}
              >
                {bundle.credits} {t('bundle.creditsUnit')} · {t(`bundle.${bundle.id}.description`)}
              </p>
            </div>

            {/* Price */}
            <div className="shrink-0 text-right">
              <span
                className={cn(
                  'text-2xl font-bold tracking-tight',
                  isSelected ? 'text-neutral-50' : 'text-neutral-200',
                )}
              >
                {formatPrice(bundle.priceCents)}
              </span>
            </div>
          </button>
        );
      })}

      {balance != null && (
        <p className="pt-1 text-center text-xs text-neutral-500">
          {t('bundle.currentBalance', { count: balance })}
        </p>
      )}
    </div>
  );
};
