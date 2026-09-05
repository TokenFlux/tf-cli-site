import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import astrowind from './vendor/integration';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
  integrations: [sitemap(), mdx(), icon({ include: { tabler: ['*'] } }), astrowind({ config: './src/config.yaml' })],
  image: { responsiveStyles: true },
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { '~': path.resolve(root, './src') } },
  },
});
