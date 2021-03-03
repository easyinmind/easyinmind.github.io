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
      { text: "🦥 多端", link: "/moreend/" },
    ],
  },
  {
    text: "🌳 计算机",
    items: [
      { text: "🦜 网络协议", link: "/network/" },
      { text: "🕊 设计模式", link: "/patterns/" },
      { text: "🦃 数据结构&算法", link: "/data/" },
    ],
  },
  {
    text: "🌲后端&运维",
    items: [
      { text: "🦀 后端", link: "/nodejs/" },
      { text: "🐢 运维相关", link: "/ops/" },
      { text: "🐋 数据库", link: "/db/" },
    ],
  },
  {
    text: "🌵 其它",
    items: [
      { text: "🦉 笔记", link: "/note/" },
    ],
  },
  {
    text: "🎋 导航",
    link: "/archives/",
    items: [
      { text: "🍋 分类", link: "/categories/" },
      { text: "🍇 标签", link: "/tags/" },
      { text: "🥑 归档", link: "/archives/" },
      { text: "🍏 关于", link: "/about/" }
    ],
  },
];
