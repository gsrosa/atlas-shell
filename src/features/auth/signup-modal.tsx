'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@gsrosa/nexploring-ui';
import { useTranslation } from 'react-i18next';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { SignUpForm } from '@/features/auth/signup-form';

export const SignUpModal = () => {
  const { t } = useTranslation('common');
  const open = useAuthUiStore((s) => s.signUpOpen);
  const closeSignUp = useAuthUiStore((s) => s.closeSignUp);
  const openLogin = useAuthUiStore((s) => s.openLogin);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) closeSignUp();
      }}
    >
      <DialogContent className="max-w-[460px]">
        <DialogHeader>
          <DialogTitle>{t('auth.signUpTitle')}</DialogTitle>
          <DialogDescription>{t('auth.signUpDescription')}</DialogDescription>
        </DialogHeader>
        <SignUpForm />
        <p className="text-center text-sm text-neutral-400">
          {t('auth.alreadyHaveAccount')}{' '}
          <button
            type="button"
            onClick={openLogin}
            className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            {t('nav.signIn')}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};
