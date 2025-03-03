import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      dts: {
        autoExtension: false,
      },
      output: {
        distPath: {
          root: 'dist/esm',
        },
      },
    },
    {
      format: 'cjs',
      syntax: 'es2021',
      dts: {
        autoExtension: false,
      },
      output: {
        distPath: {
          root: 'dist/cjs',
        },
      },
    },
  ],
});
