# NeteaseMusic

一个精美的网易云音乐播放器。

### Preview

- [移动端播放页面](http://captaininphw.xyz/NeteaseMusic/dist/html/index.html)
- [PC 端管理页面](http://captaininphw.xyz/NeteaseMusic/dist/html/admin.html)

### Technique stack

该项目包括 **PC 端后台管理页面** 以及 **移动端播放页面**，项目主要涉及到的技术有：
- [HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)：根据 **HTML** 最新标准使用具有语义化的标签
- [CSS3](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS3)：根据 **CSS** 语言最新版本为元素设置正确的样式
- [jQuery](http://api.jquery.com/)：原生 JS 的封装库，更加便捷的操作 DOM 以及调用 JS API
- [Swiper](http://idangero.us/swiper/)：最流行的**轮播插件**，适配 PC 端和移动端
- [MVC](https://zh.wikipedia.org/wiki/MVC)：即 **Model**、**View**、**Controller**，一种软件设计模式，面向对象编程
- [观察者模式](https://zh.wikipedia.org/wiki/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)：观察者模式是软件设计模式的一种。在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。这通常透过呼叫各观察者所提供的方法来实现。此种模式通常被用来实时事件处理系统。
- [Webpack](https://webpack.js.org/)：**前端工程化** 打包工具，大大节省了开发效率
- [LeanCloud](https://leancloud.cn/)：提供一站式后端云服务，作为歌曲信息存储的后台云服务器
- [七牛云](https://www.qiniu.com)：国内领先的企业级云服务商，作为歌曲文件存储的后台云服务器
- [Vultr]()：**SSD VPS Server**，虚拟服务器，利用 **PM2** 开启 **Node.js** 服务监听 **1234** 端口的请求，用来生成 `uptoken` ，在后台向七牛上传文件前进行初始化，给予权限

### Releases
#### Version 1.0

- 完成 PC 端管理页面的部分样式制作
- 完成新建歌曲、编辑歌曲页面制作

### Solved issues

- **阻止后台在上传音乐文件期间再次上传文件**
  
  **问题描述**：后台管理面板在上传文件时，再次上传文件会导致之前上传的文件不能够编辑。
  
  **解决方法**：利用状态机，在用户上传文件前判断状态机状态，若状态机为 `true`，则 `return turn` 给其后环节，允许用户上传；若状态机为 `false`，则 `return false` 给其后环节，阻止用户上传。判断状态机环节在 **七牛云** 所提供 API 的钩子函数中。 
- **后台上传完歌曲进行编辑时正确显示上传歌曲的信息**

   **问题描述**：在第一次上传完歌曲后，之后每次上传歌曲后的编辑歌曲信息界面初始化都为第一次上传的歌曲信息。
   
   **解决方法**：在每次上传歌曲后，都初始化歌曲信息模板，将最新数据更新至歌曲信息模板，然后渲染至歌曲编辑页。
- **阻止移动端浮层滚动事件冒泡**
  
  **问题描述**：`display: fixed` 定位的元素其滚动事件会冒泡至父级元素，至使被该 `fixed` 定位的元素遮挡的父级元素也一起滚动。
  
  **解决方法**：在浮层出现时，给 `html` 以及 `body` 添加 `overflow： hidden` 属性，同时结合 JS 阻止移动端在屏幕滑动时的事件冒泡：
  
  **CSS**:
  ```css
  /* 浮层元素出现时 */
  html, body{
    position:relative;
    overflow: hidden;
  }
  ```
  **JS**:
  ```javascript
  $('.浮层元素').on('touchmove', (event) => {
    event.preventDefault();
  })
  ```
- **阻止移动端播放光盘旋转动画暂停后再次启动时旋转角度恢复至初始状态**
  
  **问题描述**：移动端 CSS 属性 `animation-play-state` 无效，因为该属性仍在实验阶段，致使播放歌曲页面再点击暂停按钮时光盘 div 仍在旋转，再次点击播放按钮时光盘 div 会恢复至最初始角度开始旋转动画，不能从暂停时的角度开始旋转（不能记录状态）。
  
  **解决方法**：在光盘 div 上加一层 wrapper，利用 JS，在点击暂停按钮时进行判断，若首次暂停，则令 wrapper 的 transform 为暂停一瞬间的光盘 div 的 transform 值，否则 wrapper 的 transform 为光盘当前的 transform 值加上暂停一瞬间的光盘 div 的 transform 值；再次点击播放时，光盘 div 要恢复初始状态，由于 wrapper 的 transform 值刚好是光盘 div 需要转回去的值，因此在视觉上的表现为光盘是从暂停的位置开始旋转的。
  
  **HTML**
  ```html
  <div class="song-wrapper">
      <div class="song-disc"></div>
  </div>
  ```
  
  **CSS**
  ```css
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  .rotate{
    animation: rotate 15s linear infinite;
  }
  ```
  
  **JS**
  ```javascript
  let wrap = document.querySelector('.song-wrapper');
  let disc = wrap.querySelector('.song-disc');
  let isPlaying = true;
  $('.play-pause-btn').on('click',()=>{
      isPlaying ? pause() : play();
  });
  function pause() {
      console.log('暂停')
      isPlaying = false;
      let cTransform = getComputedStyle(wrap).transform; // 获取容器的旋转角度
      let iTransform = getComputedStyle(disc).transform; // 获取磁盘的旋转角度
      // 若初次暂停，则容器的 transform 为磁盘的 transform 值，否则容器的 transform 为自身的 transform 值+ 磁盘的 transform值
      wrap.style.transform = cTransform ===  'none' ? iTransform : iTransform.concat(' ', cTransform);
      disc.classList.remove('rotate');
  }
  function play() {
      console.log('播放')
      isPlaying = true;
      disc.classList.add('rotate');
  }
  ```
- **禁止移动端元素被点击时出现闪烁**
  
  **问题描述**：移动端页面元素被点击出现闪烁，初步考虑可能是移动端与用户交互特别设置的提示。
  
  **解决方法**：使用 CSS 属性 `-webkit-tap-highlight-color` 解决。
  
  **CSS**
  
  ```css
  *{
    -webkit-tap-highlight-color: transparent;
  }
  ```
  
- **禁止元素在隐藏时因为 CSS 导致宽高变动**
  
  **问题描述**：元素在隐藏与显示时因为 CSS 属性缘故导致父元素宽高发生变化。
  
  **解决方法**：使用 CSS 属性 `visibility: hidden;` 代替 `display: none;` 即可。
