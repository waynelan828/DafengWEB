import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import netlify from '@astrojs/netlify';     // 🚀 Netlify adapter
import decapCmsOauth from 'astro-decap-cms-oauth';    // 🚀 Decap CMS OAuth
import astrowind from './vendor/integration';

import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin,
} from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (
  items: (() => AstroIntegration) | (() => AstroIntegration)[] = []
) =>
  hasExternalScripts
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

export default defineConfig({
  adapter: netlify(), // ✅ 使用 Netlify adapter 部署

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),

    decapCmsOauth(), // ✅ 加上 Decap CMS OAuth
  ],

  site: 'https://nice8.works',

  image: {
    service: {
      entrypoint: '@astrojs/netlify/image-service',
    },
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
