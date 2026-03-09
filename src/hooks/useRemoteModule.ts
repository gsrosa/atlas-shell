import { useMemo } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { loadRemoteModule } from '@/microfrontends/loadRemoteModule';

interface UseRemoteModuleResult {
  Component: LazyExoticComponent<ComponentType>;
}

export function useRemoteModule(
  remoteName: string,
  exposedModule: string,
): UseRemoteModuleResult {
  const Component = useMemo(
    () => loadRemoteModule(remoteName, exposedModule),
    [remoteName, exposedModule],
  );

  return { Component };
}
