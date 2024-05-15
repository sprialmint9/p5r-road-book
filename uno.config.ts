import { defineConfig, presetTypography, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { presetDaisy } from '@unscatty/unocss-preset-daisy';
import presetSafeArea from '@yeungkc/unocss-preset-safe-area';

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
  },
  rules: [['webkit-sticky', { position: '-webkit-sticky' }]],
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
