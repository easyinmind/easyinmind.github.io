// nav
module.exports = [
  { text: "首页", link: "/" },
  {
    text: "🌴 前端",
    items: [
      { text: "🦧 HTML&CSS", link: "/htmlcss/" },
      { text: "🦍 JavaScript", link: "/javascript/" },
      { text: "🐎 工程化相关", link: "/engineering/" },
      { text: "🐘 框架&源码", link: "/code/" },
      { text: "🦥 运行环境", link: "/moreend/" },
      {
        text: "🦙 项目&其它",
        link: "/feother/",
      },
    ],
  },
  {
    text: "🌳 编程",
    items: [
      {
        text: "计算机基础",
        items: [
          { text: "🦜 网络协议", link: "/network/" },
          { text: "🕊 设计模式", link: "/patterns/" },
          { text: "🦃 数据结构&算法", link: "/data/" },
        ],
      },
      {
        text: "后端&运维",
        items: [
          { text: "🦀 nodejs", link: "/nodejs/" },
          { text: "🐢 运维相关", link: "/ops/" },
          { text: "🐋 数据库", link: "/db/" },
        ],
      },
    ],
  },
  {
    text: "🌵 笔记",
    items: [{ text: "🦉《你不知道的js》", link: "/book1/" }],
  },
  {
    text: "🎋 导航",
    link: "/archives/",
    items: [
      { text: "🍉 日常记录", link: "/live/" },
      { text: "🍏 关于我", link: "/about/" },
      { text: "🍋 分类", link: "/categories/" },
      { text: "🍇 标签", link: "/tags/" },
      { text: "🥑 归档", link: "/archives/" },
    ],
  },
];
