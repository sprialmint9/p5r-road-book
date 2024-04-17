import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import react from '@vitejs/plugin-react-swc';
import unocssPostcss from '@unocss/postcss';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

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
  preview: {
    https: {
      cert: fs.readFileSync(path.join(__dirname, 'keys/myapp.dev+4.pem')),
      key: fs.readFileSync(path.join(__dirname, 'keys/myapp.dev+4-key.pem')),
    },
  },
  plugins: [
    react(),
    UnoCSS(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'P5R RoadBook',
        short_name: 'P5RBook',
        description: 'P5R road book',
        start_url: '.',
        display: 'standalone',
        display_override: ['fullscreen', 'minimal-ui'],
        orientation: 'portrait-primary',
        theme_color: '#f2f2f2',
        background_color: '#f2f2f2',
        icons: [
          {
            src: '/icons/57.png',
            sizes: '57x57',
            type: 'image/png',
          },
          {
            src: '/icons/60.png',
            sizes: '60x60',
            type: 'image/png',
          },
          {
            src: '/icons/72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/icons/76.png',
            sizes: '76x76',
            type: 'image/png',
          },
          {
            src: '/icons/114.png',
            sizes: '114x114',
            type: 'image/png',
          },
          {
            src: '/icons/120.png',
            sizes: '120x120',
            type: 'image/png',
          },
          {
            src: '/icons/128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/icons/144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/icons/152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/icons/180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: '/icons/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/icons/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          // {
          //   src: '/icons/512.png',
          //   sizes: '512x512',
          //   type: 'image/png',
          //   purpose: 'any',
          // },
        ],
        screenshots: [
          {
            src: '/screenshot/540x720.png',
            type: 'image/png',
            sizes: '540x720',
            form_factor: 'narrow',
          },
          {
            src: '/screenshot/720x540.png',
            type: 'image/jpg',
            sizes: '720x540',
            form_factor: 'wide',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,woff2,json,ts,tsx,jsx,txt}'],
        runtimeCaching: [
          {
            urlPattern: /^\.js/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'site-js',
            },
          },
          {
            urlPattern: /^\.css/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'site-css',
            },
          },
          {
            urlPattern: /^\.[png|jpg|jpeg|svg|woff2|json|txt]/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'site-assets',
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
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
