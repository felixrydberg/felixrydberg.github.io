import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  base: '/portfolio',
  integrations: [tailwind(), vue()],
  site: 'https://felixrydberg.github.io',
});