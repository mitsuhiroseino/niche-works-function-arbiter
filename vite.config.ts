import { glob } from 'glob';
import { resolve } from 'path';
import { type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
/// <reference types="vitest/globals" />
import { defineConfig } from 'vitest/config';

const deleteEmptyFiles = (): Plugin => ({
  name: 'delete-empty-files',
  generateBundle(_, bundle) {
    for (const [fileName, file] of Object.entries(bundle)) {
      // チャンク（JS）かつ、コードが実質空（インポート文等を除いて中身がない）場合
      // このプロジェクトで扱うのは型のみなので、実質jsファイルは不要
      if (file.type === 'chunk' && file.code.trim().length === 0) {
        delete bundle[fileName];
      }
    }
  },
});

export default defineConfig({
  build: {
    lib: {
      entry: glob
        .sync('src/**/*.{ts,js}', {
          ignore: ['src/**/*.d.ts', 'src/**/*.test.ts'],
        })
        .map((file) => resolve(__dirname, file)),
    },
    rollupOptions: {
      // 外部ライブラリをバンドルに含めない設定
      external: (id) => !id.startsWith('.') && !id.startsWith('/'),
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          dir: 'dist',
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          dir: 'dist',
        },
      ],
    },
  },
  plugins: [
    deleteEmptyFiles(),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'node',
  },
});
