import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import tsconfigPaths from 'vite-tsconfig-paths';

import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    sentryVitePlugin({
      org: 'your-org',
      project: 'your-project',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});
