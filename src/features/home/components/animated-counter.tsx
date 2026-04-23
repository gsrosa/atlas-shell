'use client';

import React from 'react';

import { useInView } from '../hooks/use-in-view';

type AnimatedCounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
};

export const AnimatedCounter = ({ to, suffix = '', duration = 1800 }: AnimatedCounterProps) => {
  const [val, setVal] = React.useState(0);
  const { ref, inView } = useInView(0.3);

  React.useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let rafId: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};
