import { defineConfig } from 'vitepress';
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons';

export default defineConfig({
  title: 'tempo',
  lang: 'en-US',
  description:
    'A set of libraries used to programmatically build markdown documents.',
  srcDir: 'content',
  base: '/tempo/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Tempo | Programmatically build markdown documents' }],
    ['meta', { property: 'og:site_name', content: 'Tempo' }],
    ['meta', { property: 'og:image', content: 'https://joggrdocs.github.io/tempo-social.png' }],
    ['meta', { property: 'og:url', content: 'https://joggrdocs.github.io/' }],
  ],
  themeConfig: {
    siteTitle: false,
    logo: {
      dark: '/images/tempo-logo-dark.svg',
      light: '/images/tempo-logo-light.svg',
    },
    logoLink: '/',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Examples', link: '/examples' },
      { text: 'Reference', link: '/api/javascript' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide' },
          { text: 'Philosophy', link: '/guide/philosophy' },
          { text: 'Why Tempo', link: '/guide/why' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Introduction', link: '/examples' },
          { text: 'GitHub Actions', link: '/examples/gha' },
        ],
      },
      {
        text: 'APIs',
        items: [{ text: 'JavaScript API', link: '/api/javascript' }],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/joggrdocs/tempo' },
      { icon: 'bluesky', link: 'https://joggr.bsky.social' },
      { icon: 'substack', link: 'https://duckiedocs.substack.com' },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
});
