/*
 * song-upload.js
 * Copyright (C) 2018 daijt <daijt@david.local>
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    let view = {
        el: $('.upload-page'),
        render(data) {
            this.el.append(data);
        },
        uploading() {
            this.el.find('#upload-area').addClass('uploading');
        },
        uploaded() {
            this.el.find('#upload-area').removeClass('uploading');
        }
    };

    let model = {
        data: {
            song: '',
            singer: '',
            lyric: '',
            url: ''
        },
        template: ` 
            <div id="upload-area">
                <div id="upload-button">选择文件</div>
            </div> 
        `,
        refreshData(up, info) {
            let resdata = this.splitSongInfo(JSON.parse(info.response), up.getOption('domain'));
            this.data = JSON.parse(JSON.stringify(resdata));
        },
        splitSongInfo({key}, domain) {
            let rmSuffix = key.replace(/.mp3|.mp4|.flac/, '');
            let splitSongName = rmSuffix ? rmSuffix.split('-') : key.split('-');
            if (splitSongName.length === 2) {
                return {
                    song: splitSongName[0].trim(),
                    singer: splitSongName[1].trim(),
                    url: `${domain}/${key}`,
                    lyric: '',
                    cover: ''
                }
            } else {
                return {
                    song: key,
                    singer: '',
                    url: `${domain}/${key}`,
                    lyric: '',
                    cover: ''
                }
            }
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
                chunk_size: '10MB',
                auto_start: true,
                init: {
                    UploadProgress() {
                        view.uploading();
                    },
                    FileUploaded(up, file, info) {
                        model.refreshData(up, info);
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
