import { defineConfig, presetTypography, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { presetDaisy } from '@unscatty/unocss-preset-daisy';

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
  },
  presets: [presetUno(), presetTypography(), presetIcons(), presetDaisy()],
});
