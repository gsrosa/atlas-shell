import React from 'react';

import { cn } from '@gsrosa/atlas-ui';

import { useInView } from '../hooks/use-in-view';

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  role?: string;
};

export const FadeUp = ({ children, delay = 0, className, role }: FadeUpProps) => {
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      role={role}
      className={cn('fade-up', inView && 'in-view', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};
