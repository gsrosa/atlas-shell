'use client';

import React from 'react';

import * as NexploringUi from '@gsrosa/nexploring-ui';
import * as ReactQuery from '@tanstack/react-query';
import * as LucideReact from 'lucide-react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDom from 'react-router-dom';
import * as Zustand from 'zustand';

import type {
  ExposedModules,
  RemoteKey,
} from '@/shared/constants/module-names';

const REMOTE_ENTRY_URLS: Record<RemoteKey, string> = {
  planning:
    process.env.NEXT_PUBLIC_REMOTE_AI_ASSISTANT_URL ??
    'http://localhost:3002/remoteEntry.js',
  userApp:
    process.env.NEXT_PUBLIC_REMOTE_USER_APP_URL ??
    'http://localhost:3003/remoteEntry.js',
  paymentApp:
    process.env.NEXT_PUBLIC_REMOTE_PAYMENT_APP_URL ??
    'http://localhost:3004/remoteEntry.js',
};

// ── MF container interface ─────────────────────────────────────────────────────

type MFContainer = {
  init: (sharedScope: Record<string, unknown>) => Promise<void> | void;
  get: (module: string) => Promise<() => { default: React.ComponentType }>;
};

const loadedScripts = new Set<string>();

function loadScript(url: string): Promise<void> {
  if (loadedScripts.has(url)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => {
      loadedScripts.add(url);
      resolve();
    };
    script.onerror = () =>
      reject(new Error(`[loadRemoteModule] Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

const loadedContainers = new Map<RemoteKey, MFContainer>();

async function getContainer(remoteName: RemoteKey): Promise<MFContainer> {
  const cached = loadedContainers.get(remoteName);
  if (cached) return cached;

  const url = REMOTE_ENTRY_URLS[remoteName];

  await loadScript(url);

  const win = window as unknown as Record<string, unknown>;
  const container = win[remoteName] as MFContainer | undefined;

  if (
    !container ||
    typeof container.init !== 'function' ||
    typeof container.get !== 'function'
  ) {
    throw new Error(
      `[loadRemoteModule] MF container not found for "${remoteName}". ` +
        `Check that the MFE server at ${url} is running and exporting { init, get }.`,
    );
  }

  const reactVersion = React.version;
  const sharedScope = {
    react: {
      [reactVersion]: {
        get: () => Promise.resolve(() => React),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    'react-dom': {
      [reactVersion]: {
        get: () => Promise.resolve(() => ReactDOM),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    'react-router-dom': {
      '7.0.0': {
        get: () => Promise.resolve(() => ReactRouterDom),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    zustand: {
      '5.0.0': {
        get: () => Promise.resolve(() => Zustand),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    '@tanstack/react-query': {
      '5.0.0': {
        get: () => Promise.resolve(() => ReactQuery),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    'lucide-react': {
      '1.8.0': {
        get: () => Promise.resolve(() => LucideReact),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    '@gsrosa/nexploring-ui': {
      '1.0.0': {
        get: () => Promise.resolve(() => NexploringUi),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
  };
  await container.init(sharedScope);
  loadedContainers.set(remoteName, container);
  return container;
}

// ── Public API ─────────────────────────────────────────────────────────────────

const lazyCache = new Map<
  string,
  React.LazyExoticComponent<React.ComponentType>
>();

export function loadRemoteModule(
  remoteName: RemoteKey,
  exposedModule: ExposedModules,
): React.LazyExoticComponent<React.ComponentType> {
  const key = `${remoteName}/${exposedModule}`;
  const cached = lazyCache.get(key);
  if (cached) return cached;

  const component = React.lazy(async () => {
    const container = await getContainer(remoteName);
    const factory = await container.get(`./${exposedModule}`);
    const mod = factory() as
      | React.ComponentType
      | { default: React.ComponentType };
    if (mod !== null && typeof mod === 'object' && 'default' in mod) {
      return mod as { default: React.ComponentType };
    }
    return { default: mod as React.ComponentType };
  });

  lazyCache.set(key, component);
  return component;
}
