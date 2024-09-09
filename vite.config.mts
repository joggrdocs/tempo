import path from 'node:path';

import { defineConfig as defineViteConfig } from 'vite';
import viteDts from 'vite-plugin-dts';

/**
 * Vite config
 *
 * @link https://vitejs.dev/config/
 */
export default defineViteConfig({
  base: '/',
  mode: 'production',
  plugins: [viteDts({ rollupTypes: true })],
  build: {
    outDir: path.join(__dirname, 'dist'),
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
      },
      name: 'config',
    },
  },
});
