import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GM NOTE",
  description: "note",
  base:"/gm_note/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '服务器',
        items: [
          { text: 'docker', link: '/server/docker' },
          { text: 'mysql', link: '/server/mysql' },
          { text: 'mongo', link: '/server/mongo' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
