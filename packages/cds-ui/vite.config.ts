import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
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
      entry: 'src/components/index.ts',
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
