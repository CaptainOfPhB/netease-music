/*
 * song-edit.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    console.log('引入 song-edit.js 成功！');

    let view = {
        el: $('.edit-page'),
        render() {

        }
    };

    let model = {
        data: {},
        refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        }

    };

    let controller = {
        init() {
            this.bindEvents();
        },
        bindEvents() {
            EventsHub.subscribe('uploaded', (data) => {
                model.refreshData(data);
            })
        }
    };

    controller.init();

})();
