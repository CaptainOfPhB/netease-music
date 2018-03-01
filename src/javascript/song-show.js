/*
 * song-show.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    let view = {
        el: $('.info-page'),
        render(data) {
            this.el.empty().append(data);
        },
        show() {
            this.el.removeClass('hide');
        },
        hide() {
            this.el.addClass('hide');
        },
        confirm() {
            return confirm('确定删除吗？此操作不可恢复！');
        },
        decomposeDom() {
            return {
                $songDom: this.el.find('input[name="song"]'),
                $singerDom: this.el.find('input[name="singer"]'),
                $coverDom: this.el.find('input[name="cover"]')
            }
        }
    };

    let model = {
        data: {},
        template: `
            <div class="show-area ">
                <label>歌曲名称</label>
                <input type="text" class="song" name="song" value="{{song}}">
                <label>歌手</label>
                <input type="text" class="singer" name="singer" value="{{singer}}">
                <label>歌词</label>
                <textarea class="lyric" name="lyric" cols="30" rows="8"">{{lyric}}</textarea>
                <label>封面链接</label>
                <input type="text" class="cover" name="cover" value="{{cover}}">
                <div class="button-wrapper">
                    <div class="delete"><i class="iconfont icon-warning"></i>删&nbsp;&nbsp;除</div>
                    <div class="confirm"><i class="iconfont icon-trues-active"></i>确&nbsp;&nbsp;定</div>
                </div>
            </div>
        `,
        temporaryTemplate: '',
        refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        },
        generateTemporaryTemplate(template, data) {
            for (let key in data) {
                template = template.replace(`{{${key}}}`, data[key]);
            }
            return template;
        },
        deleteData(confirm) {
            if (confirm) {
                let song = AV.Object.createWithoutData('SongList', model.data.id);
                song.destroy().then(
                    () => {
                        // console.log('删除成功！')
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                return true;
            } else {
                return false;
            }
        },
        fetchModifiedData(view) {
            return {
                song: view.$songDom.val(),
                singer: view.$singerDom.val(),
                cover: view.$coverDom.val()
            };
        },
        updateData(modifiedData) {
            let modified = {
                song: false,
                singer: false,
                lyric: false,
                cover: false
            };
            for (let key in modifiedData) {
                if (this.data[key] !== modifiedData[key]) {
                    this.data[key] = modifiedData[key];
                    modified[key] = true;
                }
            }
            if (modified.song || modified.singer || modified.cover || modified.lyric) {
                let song = AV.Object.createWithoutData('SongList', this.data.id);
                for (let key in modified) {
                    if (modified[key]) {
                        song.set(key, this.data[key]);
                    }
                }
                song.save();
            }
        }
    };

    let controller = {
        init() {
            this.bindEvents();
        },
        bindEvents() {
            EventsHub.subscribe('modify', (data) => {
                model.refreshData(data);
                view.render(model.generateTemporaryTemplate(model.template, model.data));
                view.show();
            });
            EventsHub.subscribe('new', () => {
                view.hide();
            });
            this.deleteSong();
            this.modifySong();
        },
        deleteSong() {
            view.el.on('click', '.delete', () => {
                if (model.deleteData(view.confirm())) {
                    view.hide();
                    EventsHub.publish('delete', '用户歌曲已删除！');
                }
            })
        },
        modifySong() {
            view.el.on('click', '.confirm', () => {
                model.updateData(model.fetchModifiedData(view.decomposeDom()));
                EventsHub.publish('update', model.data);
            })
        }
    };

    controller.init();

})();
