import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DesignSystem',
      fileName: (format) => `design-system.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
