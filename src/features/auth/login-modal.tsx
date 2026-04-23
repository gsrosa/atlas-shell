'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@gsrosa/atlas-ui';
import { useTranslation } from 'react-i18next';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { LoginForm } from '@/features/auth/login-form';

export const LoginModal = () => {
  const { t } = useTranslation('common');
  const open = useAuthUiStore((s) => s.loginOpen);
  const closeLogin = useAuthUiStore((s) => s.closeLogin);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) closeLogin();
      }}
    >
      <DialogContent className="max-w-[420px] border-neutral-200 bg-neutral-50 text-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-neutral-800">
            {t('auth.signInTitle')}
          </DialogTitle>
          <DialogDescription className="text-neutral-500">
            {t('auth.signInDescription')}
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};
