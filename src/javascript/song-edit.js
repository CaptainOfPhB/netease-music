/*
 * song-edit.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    // console.log('引入 song-edit.js 成功！');

    let view = {
        el: $('.edit-page'),
        init() {
        },
        render(data) {
            this.el.empty().append(data);
        },
        show() {
            this.el.removeClass('hide');
        },
        hide() {
            this.el.addClass('hide');
        }
    };

    let model = {
        data: {
            id: '',
            song: '',
            singer: '',
            url: '',
        },
        template: `
            <p class="tip">上传成功！请编辑歌曲信息！</p>
            <div class="edit-area ">
                <label>音乐标题：<input type="text" name="song" value="{{song}}"></label>
                <label>歌手：<input type="text" name="singer" value="{{singer}}"></label>
                <label>歌曲外链：<input type="text" name="url" value="{{url}}" disabled></label>
                <div class="confirm">确&nbsp;&nbsp;定</div>
            </div>
        `,
        temporaryTemplate: '',
        init() {
            this.temporaryTemplate = this.template;
        },
        refreshData(data) {
            Object.assign(this.data, JSON.parse(JSON.stringify(data)));
        },
        generateTemporaryTemplate() {
            for (let key in this.data) {
                this.temporaryTemplate = this.temporaryTemplate.replace(`{{${key}}}`, this.data[key]);
            }
        },
        getLatestData(element) {
            for (let key in this.data) {
                this.data[key] = element.find(`input[name=${key}]`).val() || '暂无';
            }
        }
    };

    let controller = {
        init() {
            model.init();
            this.bindEvents();
        },
        bindEvents() {
            EventsHub.subscribe('uploaded', (data) => {
                model.refreshData(data);
                EventsHub.publish('editing', '用户正在编辑歌曲！');
                model.generateTemporaryTemplate();
                view.render(model.temporaryTemplate);
                view.show();
            });
            this.edited();
        },
        edited() {
            view.el.on('click', '.confirm', () => {
                model.getLatestData(view.el);
                this.uploadLeanCloud(model.data);
            })
        },
        uploadLeanCloud(data) {
            let Songs = AV.Object.extend('SongList');
            let song = new Songs();
            for (let key in data) {
                if (key !== 'id') {
                    song.set(key, data[key]);
                }
            }
            song.save().then(
                (editedSong) => {
                    model.data.id = editedSong.id;
                    view.hide();
                    EventsHub.publish('edited', model.data);
                },
                (error) => {
                    console.error(error);
                });
        }
    };

    controller.init();

})();
