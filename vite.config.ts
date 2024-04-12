import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import react from '@vitejs/plugin-react-swc';
import unocssPostcss from '@unocss/postcss';
// import { VitePWA } from 'vite-plugin-pwa';

import path from 'path';
function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['./src/assets/**'],
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    UnoCSS(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   injectRegister: 'auto',
    //   devOptions: {
    //     enabled: true,
    //   },
    // }),
  ],
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
  css: {
    postcss: {
      plugins: [unocssPostcss()],
    },
  },
});
