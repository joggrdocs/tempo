import { defineConfig } from 'vitepress';
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons';

export default defineConfig({
  title: 'tempo',
  description:
    'A set of libraries used to programmatically build markdown documents.',
  srcDir: 'content',
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
