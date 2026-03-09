import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';
import { buildRemotes } from './module-federation/remotes';
import { shared } from './module-federation/shared';

export default defineConfig(({ mode }) => {
  const envVars = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      react(),
      federation({
        name: 'shell',
        remotes: buildRemotes(envVars),
        shared,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
      minify: false,
    },
  };
});
