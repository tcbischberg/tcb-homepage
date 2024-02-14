import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import client from './tina/__generated__/client';
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

const response = await client.queries.articleConnection();
const years = [
  ...new Set(
    response.data.articleConnection.edges?.map((edge) => new Date(edge?.node?.createdAt ?? '').getFullYear()) ?? []
  ),
].sort((a, b) => b - a);
const currentYear = years[0];
console.log('currentYear', currentYear);

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tina(), tailwind()],
  redirects: {
    '/archiv/rueckblick': { destination: `/archiv/rueckblick/${currentYear}`, status: 302 },
  },
});
