import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://portfolio.stng.dev',
  adapter: cloudflare(),
});