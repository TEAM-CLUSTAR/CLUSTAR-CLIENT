import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';

import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    svgSpritePlugin({
      iconDirs: [resolve(__dirname, '../cds-icon/src/assets')],
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
