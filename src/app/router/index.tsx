import { createBrowserRouter } from 'react-router-dom';
import { ShellLayout } from '@/app/layouts/ShellLayout';
import { RemoteRoute } from '@/microfrontends/RemoteRoute';
import {
  getEnabledMicrofrontends,
  getMicrofrontendComponent,
} from '@/microfrontends/registry';
import { HomePage } from './HomePage';
import { ROUTES } from './routes';

const mfeRoutes = getEnabledMicrofrontends().map((mfe) => ({
  path: mfe.routePath,
  element: (
    <RemoteRoute
      name={mfe.name}
      module={getMicrofrontendComponent(mfe.remoteName)}
    />
  ),
}));

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ShellLayout />,
    children: [{ index: true, element: <HomePage /> }, ...mfeRoutes],
  },
]);
