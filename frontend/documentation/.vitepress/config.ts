import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Mi documentacion',
  description: 'Documentación para mi proyecto frontend',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Guía',
        items: [
          { text: 'Introducción', link: '/docs/guide/introduction' },
          { text: 'Instalación', link: '/docs/guide/instalation' },
          { text: 'Estructura del proyecto', link: '/docs/guide/project-structure' },
        ],
      },
      {
        text: 'Components',
        items: [{ text: 'MyField', link: '/docs/components/my-field' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
