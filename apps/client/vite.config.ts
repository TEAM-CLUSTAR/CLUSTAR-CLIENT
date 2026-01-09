import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react-swc';

import tsconfigPaths from 'vite-tsconfig-paths';
import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { resolve } from 'path';

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
    svgSpritePlugin({
      iconDirs: [resolve(__dirname, '../../packages/cds-icon/src/assets')],
      symbolId: 'icon-[name]',
      inject: 'body-last',
      svgoConfig: {
        plugins: [
          {
            name: 'removeDimensions',
            active: true,
          },
        ],
      },
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
