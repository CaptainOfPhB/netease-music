/*
 * welcome.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    let view = {
        el: $('.welcome-page'),
        render(data) {
            this.el.append(data);
        },
        show() {
            this.el.removeClass('hide');
        },
        hide() {
            this.el.addClass('hide');
        }
    };

    let model = {
        template: `
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"></div>
                    <div class="swiper-slide"></div>
                    <div class="swiper-slide"></div>
                </div>
            </div>
            <p class="welcome-info"><i class="iconfont icon-CN_NetEasemusic"></i>欢迎使用网易云音乐后台管理系统！</p>
        `
    };

    let controller = {
        init() {
            view.render(model.template);
            this.bindEvents();
        },
        bindEvents() {
            EventsHub.subscribe('delete', () => {
                view.show();
            });
            EventsHub.subscribe('modify', () => {
                view.hide();
            });
            EventsHub.subscribe('new', () => {
                view.hide();
            });
            EventsHub.subscribe('edited', () => {
                view.show();
            });
        }
    };

    controller.init();

})();
