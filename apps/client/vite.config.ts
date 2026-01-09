import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import tsconfigPaths from 'vite-tsconfig-paths';
import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
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
});
