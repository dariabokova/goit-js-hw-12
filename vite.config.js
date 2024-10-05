import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: './dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});

// import { defineConfig } from 'vite';
// import { glob } from 'glob';
// import injectHTML from 'vite-plugin-html-inject';
// import FullReload from 'vite-plugin-full-reload';
// import SortCss from 'postcss-sort-media-queries';

// export default defineConfig(({ command }) => {
//   return {
//     base: '/goit-js-hw-09/', // Додаємо base для коректного відображення на GitHub Pages
//     define: {
//       [command === 'serve' ? 'global' : '_global']: {},
//     },
//     root: 'src',
//     build: {
//       sourcemap: true,
//       outDir: '../dist', // Вказуємо вихідну папку dist у кореневій директорії
//       emptyOutDir: true,
//       rollupOptions: {
//         input: {
//           main: './src/index.html', // Вказуємо index.html у папці src
//         },
//         output: {
//           manualChunks(id) {
//             if (id.includes('node_modules')) {
//               return 'vendor';
//             }
//           },
//           entryFileNames: '[name].js',
//           assetFileNames: 'assets/[name]-[hash][extname]',
//         },
//       },
//     },
//     optimizeDeps: {
//       include: ['simplelightbox'],
//     },
//     plugins: [
//       injectHTML(),
//       FullReload(['./src/**/**.html']),
//       SortCss({
//         sort: 'mobile-first',
//       }),
//     ],
//   };
// });

