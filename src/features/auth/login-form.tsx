import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
} from '@gsrosa/atlas-ui';
import { isTRPCClientError } from '@trpc/client';
import { useState, type FormEvent } from 'react';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { trpc } from '@/shared/providers/query-provider';

export function LoginForm() {
  const closeLogin = useAuthUiStore((s) => s.closeLogin);
  const utils = trpc.useUtils();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      await utils.users.me.invalidate();
      closeLogin();
      setPassword('');
    },
  });

  const errorMessage =
    signIn.isError && isTRPCClientError(signIn.error)
      ? signIn.error.message
      : signIn.isError
        ? 'Sign in failed'
        : null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    signIn.mutate({ email: email.trim(), password });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {errorMessage ? (
        <Alert variant="danger">
          <AlertTitle>Could not sign in</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label htmlFor="atlas-login-email">Email</Label>
        <Input
          id="atlas-login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="atlas-login-password">Password</Label>
        <Input
          id="atlas-login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
          placeholder="••••••••••••"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={signIn.isPending}>
        {signIn.isPending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
