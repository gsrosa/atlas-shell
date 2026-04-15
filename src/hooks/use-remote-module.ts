import React from 'react';

import { loadRemoteModule } from '@/microfrontends/load-remote-module';

type UseRemoteModuleResult = {
  Component: React.LazyExoticComponent<React.ComponentType>;
};

export const useRemoteModule = (
  remoteName: string,
  exposedModule: string,
): UseRemoteModuleResult => {
  const Component = React.useMemo(
    () => loadRemoteModule(remoteName, exposedModule),
    [remoteName, exposedModule],
  );

  return { Component };
};
