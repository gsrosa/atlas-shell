'use client';

import React from 'react';

import { Button } from '@gsrosa/nexploring-ui';
import { ArrowLeftIcon, CoinsIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import type { CreditBundle } from '@/shared/constants/credits';
import { ROUTES } from '@/shared/constants/shell-routes';
import { BundlePicker } from './bundle-picker';
import { CheckoutForm, OrderSummary } from './checkout-form';

type Step = 'pick' | 'checkout';

// ─── Step indicator ────────────────────────────────────────────────────────

const StepIndicator = ({ step }: { step: Step }) => {
  const { t } = useTranslation('payment');
  const steps = [
    { key: 'pick', label: t('steps.pick') },
    { key: 'checkout', label: t('steps.checkout') },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const isActive = s.key === step;
        const isPast = steps.findIndex((x) => x.key === step) > i;

        return (
          <React.Fragment key={s.key}>
            {i > 0 && (
              <div
                className={`h-px flex-1 transition-colors ${isPast ? 'bg-primary-500/60' : 'bg-white/10'}`}
              />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : isPast
                      ? 'bg-primary-500/30 text-primary-400'
                      : 'bg-white/8 text-neutral-500'
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`hidden text-xs font-medium transition-colors sm:inline ${
                  isActive ? 'text-neutral-200' : isPast ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                {s.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── Main page ─────────────────────────────────────────────────────────────

export const AddCreditsPage = () => {
  const { t } = useTranslation('payment');
  const [step, setStep] = React.useState<Step>('pick');
  const [selected, setSelected] = React.useState<CreditBundle | null>(null);

  const handleContinue = () => {
    if (selected) setStep('checkout');
  };

  return (
    <div className="min-h-[calc(100dvh-60px)] bg-neutral-900 px-4 pb-16 pt-8 md:px-6 md:pt-10 lg:px-10">
      {/* Page header */}
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-300"
          >
            <ArrowLeftIcon className="size-3.5" strokeWidth={2} />
            {t('checkout.backHome')}
          </Link>

          <StepIndicator step={step} />
        </div>

        {/* ── Step 1: Pick a plan ──────────────────────────────────────── */}
        {step === 'pick' && (
          <div className="mx-auto max-w-xl">
            {/* Heading */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary-500/15 ring-1 ring-primary-500/20">
                <CoinsIcon className="size-7 text-primary-400" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl">
                {t('addCredits.title')}
              </h1>
              <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                {t('addCredits.description')}
              </p>
            </div>

            {/* Bundle picker */}
            <BundlePicker selected={selected} onSelect={setSelected} />

            {/* Continue */}
            <div className="mt-6">
              <Button
                type="button"
                variant="primary"
                className="w-full font-semibold"
                disabled={!selected}
                onClick={handleContinue}
              >
                {t('addCredits.continue')}
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Checkout ─────────────────────────────────────────── */}
        {step === 'checkout' && selected && (
          <div className="mx-auto max-w-5xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-50">
                {t('checkout.title')}
              </h1>
              <p className="mt-1 text-sm text-neutral-400">{t('checkout.subtitle')}</p>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
              {/* ── Left: forms ──────────────────────────────────────── */}
              <div className="flex-1">
                <CheckoutForm
                  bundle={selected}
                  onBack={() => setStep('pick')}
                />
              </div>

              {/* ── Right (desktop) / Top (mobile, shown above via order) ── */}
              <div className="order-first lg:order-last lg:w-80 lg:shrink-0">
                <OrderSummary bundle={selected} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
