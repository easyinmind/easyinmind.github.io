## Easyinmind's blog 📱 💻
> 基于 vuepree voding theme

[🌾点击访问](https://blog.easyinmind.top/)
### 本地运行 ➡️
```
npm run dev
```
[http://localhost:8080/](http://localhost:8080/)
### 编译打包 ➡️
```
npm run build
```
### 分支 🛤
+ *master*: 保存源文件
+ *blog*: 编译后文件的分支、默认分支

### 发布 🦍
***只需要推送 master 分支***
> github action, 监听 master 分支 push，编译到 blog 分支。  
+ easyinmind.github.io命名仓库会解析默认的分支，所以更改默认分支为 blog。   
+ 设定 github page 的 Source 为 blog 分支

### 写作规范
> + 默认title转为一级标题（一级标题无效），二级标题默认带下边框，左侧边栏能识别二级和三级标题，但是三级标题前必须有一个二级标题（文章内第一个标题需要是二级）
> + 为了左侧目录清晰，建议文章标题使用二级

```md
## 标题1
## 标题2
## 标题3

```