# NeteaseMusic

一个精美的网易云音乐播放器。

### 预览地址

- [移动端播放页面](http://captaininphw.xyz/NeteaseMusic/dist/html/index.html)
- [PC 端管理页面](http://captaininphw.xyz/NeteaseMusic/dist/html/admin.html)

### 技术栈

该项目包括 **PC 端后台管理页面** 以及 **移动端播放页面**，项目主要涉及到的技术有：
- [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)：根据 **HTML** 最新标准使用具有语义化的标签
- [CSS3](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS3)：根据 **CSS** 语言最新版本为元素设置正确的样式
- [jQuery](http://api.jquery.com/)：原生 JS 的封装库，更加便捷的操作 DOM 以及编写 JS 语句
- [Swiper](http://idangero.us/swiper/)：最流行的**轮播插件**，适配 PC 端和移动端
- [MVC](https://zh.wikipedia.org/wiki/MVC)：即 **Model**、**View**、**Controller**，一种软件设计模式，面向对象编程
- [Webpack](https://webpack.js.org/)：**前端工程化** 打包工具，大大节省了开发效率
- [LeanCloud](https://leancloud.cn/)：提供一站式后端云服务，作为歌曲信息存储的后台云服务器
- [七牛云](https://www.qiniu.com)：国内领先的企业级云服务商，作为歌曲文件存储的后台云服务器

### 版本
##### Version 1.0

- 完成 PC 端管理页面的部分样式制作
- 完成新建歌曲、编辑歌曲页面制作

### Solved issues

- ##### 阻止后台在上传音乐文件期间再次上传文件
  **问题描述**：后台管理面板在上传文件时，再次上传文件会导致之前上传的文件不能够编辑。
  
  **解决方法**：利用状态机，在用户上传文件前判断状态机状态，若状态机为 `true`，则 `return turn` 给其后环节，允许用户上传；若状态机为 `false`，则 `return false` 给其后环节，阻止用户上传。判断状态机环节在 **七牛云** 所提供 API 的钩子函数中。 
- ##### 阻止移动端浮层滚动事件冒泡
  **问题描述**：`display: fixed` 定位的元素其滚动事件会冒泡至父级元素，至使被该 fixed 定位的元素遮挡的父级元素也一起滚动。
  
  **解决方法**：在浮层出现时，给 `html` 以及 `body` 添加 `overflow： hidden` 属性，同时结合 JS 阻止移动端在屏幕滑动时的事件冒泡：
  CSS:
  ```css
  /* 浮层元素出现时 */
  html, body{
    position:relative;
    overflow: hidden;
  }
  ```
  JS:
  ```javascript
  $('.浮层元素').on('touchmove', (event) => {
    event.preventDefault();
  })
  ```