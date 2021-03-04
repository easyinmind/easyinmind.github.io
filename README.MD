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
+ *blog*: 编译后文件保存分支、默认分支

### 发布 🦍
***只需要推送 master 分支***
> 使用 github action, 监听 master 分支 push，编译到 blog 分支。  
+ easyinmind.github.io命名仓库会解析默认的分支，所以更改默认分支为 blog。   
+ 设定 github page 的 Source 为 blog 分支