import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
const tina = ({ directiveName = 'tina' } = {}) => ({
  name: 'tina-cms',
  hooks: {
    'astro:config:setup': ({ addClientDirective }) => {
      addClientDirective({
        name: directiveName,
        entrypoint: './client-directives/tina.mjs',
      });
    },
  },
});

const currentYear = new Date().getFullYear();

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tina(), tailwind()],
  redirects: {
    '/archiv/rueckblick': { destination: `/archiv/rueckblick/${currentYear}`, status: 303 },
  },
});
