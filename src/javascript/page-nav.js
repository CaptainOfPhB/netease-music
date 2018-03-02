/*
 * page-nav.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    let view = {
        el: $('#page-navigation'),
        render(data) {
            this.el.append(data);
        },
        find(selector) {
            return this.el.find(selector);
        },
        show($dom) {
            view.find('.item span').map((index, spanDom) => {
                $(spanDom).removeClass('active');
            });
            $dom.addClass('active');
        }
    };

    let model = {
        data: '',
        template: `
            <nav id="nav-tab">
                <div class="item">
                    <span data-bind-page=".page-remd" id="tab-remd" class="page-remd active">推荐音乐</span>
                </div>
                <div class="item">
                    <span data-bind-page=".page-hottop" class="page-hottop" id="tab-hottop">热歌榜</span>
                </div>
                <div class="item">
                    <span data-bind-page=".page-search" class="page-search" id="tab-search">搜索</span>
                </div>
            </nav>
        `,
        refreshData() {

        }
    };

    let controller = {
        init() {
            view.render(model.template);
            this.bindEvents();
        },
        bindEvents() {
            view.find('#nav-tab').on('click', 'span', (event) => {
                view.show($(event.currentTarget));
                EventsHub.publish('switchTab', $(event.currentTarget).attr('data-bind-page'));
            });
            EventsHub.subscribe('contact', (data) => {
                view.show(view.find(data));
            })
        }
    };

    controller.init();

})();
