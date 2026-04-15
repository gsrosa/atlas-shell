import { createBrowserRouter } from 'react-router-dom';
import { ShellLayout } from '@/components/shell-layout';
import { RemoteRoute } from '@/microfrontends/remote-route';
import { getEnabledMicrofrontends } from '@/microfrontends/registry';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';
import { ROUTES } from '@/shared/constants/shell-routes';
import { HomePage } from '@/features/home';
import { NotFoundPage } from '@/features/not-found/not-found-page';

function toRelativeSplat(absolutePath: string): string {
  return absolutePath.startsWith('/') ? absolutePath.slice(1) : absolutePath;
}

const shellChildren = [
  { index: true, element: <HomePage /> },
  ...getEnabledMicrofrontends().map((mfe) => ({
    path: toRelativeSplat(mfe.routePath),
    element: (
      <RemoteRoute
        name={mfe.name}
        module={loadRemoteModule(mfe.remoteName, mfe.exposedModule)}
        skeleton={mfe.skeletonModule ? loadRemoteModule(mfe.remoteName, mfe.skeletonModule) : undefined}
        requireAuth={mfe.requireAuth}
      />
    ),
  })),
  { path: '*', element: <NotFoundPage /> },
];

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ShellLayout />,
    children: shellChildren,
  },
]);
