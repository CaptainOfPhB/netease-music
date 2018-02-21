/*
 * song-new.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

(function () {
    'use strict';

    // console.log('引入 song-new.js 成功！');

    let view = {
        el: $('.aside-bar'),
        render(data) {
            this.el.append(data);
        }
    };

    let model = {
        template: `<div id="add-song"><i class="iconfont icon-0801zengjia"></i>新增歌曲</div>`
    };

    let controller = {
        init() {
            view.render(model.template);
            this.bindEvents();
        },
        bindEvents() {
            view.el.find('#add-song').on('click', () => {
                EventsHub.publish('new', '用户需要新增歌曲！');
            })
        }
    };

    controller.init();


})();
