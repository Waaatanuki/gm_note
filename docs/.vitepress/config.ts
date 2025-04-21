import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GM NOTE",
  description: "note",
  base:"/gm_note/",
  head:[
    ['link', { rel: 'icon', href: '/The-Earth/favicon.ico' }],
  ],
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
          { text: 'prisma', link: '/server/prisma' },
          { text: 'mysql', link: '/server/mysql' },
          { text: 'mongo', link: '/server/mongo' },
        ]
      },
      {
        text: '客户端',
        items: [
          { text: '激活码', link: '/client/code' },
        ]
      },
      {
        text: '开发',
        items: [
          { text: 'WSL', link: '/dev/wsl' },
          { text: 'Ubuntu', link: '/dev/ubuntu' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
