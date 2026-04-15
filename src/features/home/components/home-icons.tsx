import React from 'react';

import { BrainIcon, MapIcon, RefreshCwIcon, UserIcon } from 'lucide-react';

const FEATURE_ICONS = [BrainIcon, UserIcon, MapIcon, RefreshCwIcon] as const;

export const FeatureIcon = ({ index }: { index: number }) => {
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
  return <Icon className="size-5" aria-hidden strokeWidth={1.75} />;
};
