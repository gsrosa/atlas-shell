import type { ComponentType, LazyExoticComponent } from 'react';
import type { FeatureFlagKey } from '@/config/featureFlags';
import { isFeatureEnabled } from '@/config/featureFlags';
import { loadRemoteModule } from '@/microfrontends/loadRemoteModule';

interface MicrofrontendConfig {
  name: string;
  remoteName: string;
  exposedModule: string;
  routePath: string;
  navigationLabel: string;
  featureFlag: FeatureFlagKey;
}

export const microfrontendRegistry: Record<string, MicrofrontendConfig> = {
  searchApp: {
    name: 'Search',
    remoteName: 'searchApp',
    exposedModule: 'App',
    routePath: '/search/*',
    navigationLabel: 'Search',
    featureFlag: 'enableSearchApp',
  },
  aiAssistant: {
    name: 'AI Assistant',
    remoteName: 'aiAssistant',
    exposedModule: 'App',
    routePath: '/assistant/*',
    navigationLabel: 'AI Assistant',
    featureFlag: 'enableAIAssistant',
  },
};

export function getEnabledMicrofrontends(): MicrofrontendConfig[] {
  return Object.values(microfrontendRegistry).filter((mfe) =>
    isFeatureEnabled(mfe.featureFlag),
  );
}

export function getAllMicrofrontends(): MicrofrontendConfig[] {
  return Object.values(microfrontendRegistry);
}

export function getMicrofrontendComponent(
  key: string,
): LazyExoticComponent<ComponentType> {
  const config = microfrontendRegistry[key];
  if (!config) {
    throw new Error(`[registry] Unknown microfrontend: "${key}"`);
  }
  return loadRemoteModule(config.remoteName, config.exposedModule);
}

export type { MicrofrontendConfig };
