import distPackage from '@niche-works/rollup-plugin-dist-package';
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.d.{ts,tsx}',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  unbundle: true,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  minify: false,
  inputOptions: {
    external(id, _importer, isResolved) {
      if (!isResolved) {
        // 相対パスでもなく、srcディレクトリ配下でもないものはnode_modules配下のモジュール
        return (
          !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('src/')
        );
      }
    },
  },
  outputOptions: {
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    distPackage({
      content: {
        main: './index.cjs',
        module: './index.mjs',
        exports: {
          '.': {
            import: './index.mjs',
            require: './index.cjs',
          },
          './*': {
            import: './*/index.mjs',
            require: './*/index.cjs',
          },
          './constants': {
            import: './constants.mjs',
            require: './constants.cjs',
          },
          './*/constants': {
            import: './*/constants.mjs',
            require: './*/constants.cjs',
          },
        },
      },
    }),
  ],
});
