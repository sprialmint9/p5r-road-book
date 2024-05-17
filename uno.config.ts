import { defineConfig, presetTypography, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { presetDaisy } from '@unscatty/unocss-preset-daisy';
import presetSafeArea from '@yeungkc/unocss-preset-safe-area';
export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
  },
  rules: [
    ['webkit-sticky', { position: '-webkit-sticky' }],
    [
      'font-family-uni',
      {
        'font-family':
          '-apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Segoe UI, Arial, Roboto, PingFang SC, Hiragino Sans GB, Microsoft Yahei, sans-serif',
      },
    ],
  ],
  safelist: ['alert', 'alert-success', 'alert-error', 'alert-warning', 'alert-info'],
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons(),
    presetDaisy({
      themes: false,
    }),
    presetSafeArea(),
  ],
});
