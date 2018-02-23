/*
 * song-upload.js
 * Copyright (C) 2018 daijt <daijt@david.local>
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    // console.log('引入 song-upload.js 成功！');

    let view = {
        el: $('.upload-page'),
        render(data) {
            this.el.append(data);
        },
        uploading() {
            this.el.find('#upload-area').addClass('uploading');
            this.el.find('#upload-button').addClass('hide');
        },
        uploaded() {
            this.el.find('#upload-area').removeClass('uploading');
            this.el.find('#upload-button').removeClass('hide');
        }
    };

    let model = {
        data: {},
        template: ` 
            <div id="upload-area">
                <div id="upload-button">选择文件</div>
            </div> 
        `,
        refreshData(up, info) {
            let {key} = JSON.parse(info.response);
            this.data = {
                song: key,
                singer: '',
                url: up.getOption('domain') + '/' + key
            };
        }
    };

    let controller = {
        init() {
            view.render(model.template);
            this.initQiniu();
            this.bindEvents();
        },
        initQiniu() {
            let uploader = Qiniu.uploader({
                runtimes: 'html5',
                browse_button: 'upload-button',
                uptoken_url: 'http://207.148.65.58:1234/uptoken',
                domain: 'p3zj54rve.bkt.clouddn.com',
                container: 'upload-area',
                max_file_size: '100MB',
                dragdrop: true,
                drop_element: 'upload-area',
                chunk_size: '4MB',
                auto_start: true,
                init: {
                    UploadProgress() {
                        view.uploading();
                    },
                    FileUploaded(up, file, info) {
                        model.refreshData(up, info);
                    },
                    UploadComplete() {
                        view.uploaded();
                        EventsHub.publish('uploaded', model.data);
                    }
                }
            });
        },
        bindEvents() {
            EventsHub.subscribe('new', () => {
                view.el.removeClass('hide');
                EventsHub.publish('uploading', '用户需要上传歌曲，侧边栏歌曲激活状态请取消！')
            });
            EventsHub.subscribe('editing', () => {
                view.el.addClass('hide');
            });
            EventsHub.subscribe('modify', () => {
                view.el.addClass('hide');
            });
        }
    };

    controller.init();

})();
