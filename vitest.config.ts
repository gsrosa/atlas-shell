import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
      // next/link and next/navigation need to be resolvable in tests.
      // These are mocked by individual tests via vi.mock(); no stub needed here.
    },
  },
  optimizeDeps: {
    exclude: ['@gsrosa/nexploring-ui'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: false,
    include: ['src/**/*.{unit,integration}.test.{ts,tsx}'],
    css: false,
    passWithNoTests: false,
  },
});
