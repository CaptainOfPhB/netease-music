/*
 * profile.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    // console.log('引入 profile.js 成功！');

    let view = {
        el: $('.top-bar'),
        render(data) {
            this.el.append(data);
        }
    };

    let model = {
        template: `
            <div class="button"></div>
            <div class="logo"></div>
            <ul class="profile">
                <li><i class="iconfont icon-person"></i>戴江涛</li>
                <li><i class="iconfont icon-wechat"></i>qq1319836729</li>
                <li><i class="iconfont icon-tel02"></i>18393986458</li>
                <li><i class="iconfont icon-mail"></i>captaininphw@gmail.com</li>
                <li><i class="iconfont icon-blog"></i><a href="http://captaininphw.xyz">Blog</a></li>
                <li><i class="iconfont icon-github"></i><a href="https://github.com/CaptainInPHW/NeteaseMusic">GitHub</a></li>
            </ul>
        `
    };

    let controller = {
        init() {
            view.render(model.template);
        }
    };

    controller.init();

})();
