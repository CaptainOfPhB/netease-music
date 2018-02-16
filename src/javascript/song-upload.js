/*
 * song-upload.js
 * Copyright (C) 2018 daijt <daijt@david.local>
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    console.log('引入 song-upload.js 成功！');

    let view = {
        el: $('.upload-page'),
        render() {

        }
    };

    let model = {
        // data: ,
        // template: ``
    };

    let controller = {
        init() {
            this.initQiniu();
            this.bindEvents();
        },
        initQiniu() {
            let uploadArea = view.el.find('#upload-area');
            let uploader = Qiniu.uploader({
                runtimes: 'html5',
                browse_button: 'upload-button',
                uptoken_url: 'http://localhost:8888/uptoken',
                domain: 'p3zj54rve.bkt.clouddn.com',
                container: 'upload-area',
                max_file_size: '100MB',
                dragdrop: true,
                drop_element: 'upload-area',
                chunk_size: '4MB',
                auto_start: true,
                init: {
                    'UploadProgress': function() {
                        uploadArea.addClass('uploading');
                    },
                    'FileUploaded': function(up, file, info) {
                        uploadArea.removeClass('uploading');
                        let {key} = JSON.parse(info.response);
                        let data = {
                            song: key,
                            singer: '',
                            url: up.getOption('domain') + '/' + key
                        };
                        EventsHub.publish('uploaded', data);
                    }
                }
            });
        },
        bindEvents() {
            EventsHub.subscribe('new', () => {
                view.el.removeClass('hide');
            })
        }
    };

    controller.init();

})();
