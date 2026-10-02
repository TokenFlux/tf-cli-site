import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import astrowind from './vendor/integration';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  i18n: {
    locales: ['en', 'zh-cn'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  integrations: [sitemap(), mdx(), icon({ include: { tabler: ['*'] } }), astrowind({ config: './src/config.yaml' })],
  image: { responsiveStyles: true },
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { '~': path.resolve(root, './src') } },
  },
});
