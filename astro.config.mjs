import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://saspara.com',
  base: '/',
  output: 'static',
  trailingSlash: 'always',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap(),
    compress({
      // Vite already minifies CSS; a second pass can strip Tailwind 4 utilities.
      CSS: false,
      HTML: true,
      JavaScript: true,
      Image: true,
      SVG: true,
      Logger: 1,
    }),
    preact({
      compat: true,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    clearScreen: false,
    build: {
      cssCodeSplit: true,
    },
    ssr: {
      external: ['aos'],
    },
  },
});
