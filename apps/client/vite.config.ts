import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react-swc';

import tsconfigPaths from 'vite-tsconfig-paths';

import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vanillaExtractPlugin(),
    sentryVitePlugin({
      org: 'team-clustar',
      project: 'clustar',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      disable: !process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  build: { sourcemap: true },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
