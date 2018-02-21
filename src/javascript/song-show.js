/*
 * song-show.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    // console.log('引入 song-show.js 成功！');

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
                $singerDom: this.el.find('input[name="singer"]')
            }
        }
    };

    let model = {
        data: {},
        template: `
            <label><span>音乐</span><input type="text" name="song" value="{{song}}"></label>
            <label><span>歌手</span><input type="text" name="singer" value="{{singer}}"></label>
            <div class="button">
                <div class="delete"><i class="iconfont icon-warning"></i>删&nbsp;&nbsp;除</div>
                <div class="confirm"><i class="iconfont icon-trues-active"></i>确&nbsp;&nbsp;定</div>
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
                        return true;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
            return false;
        },
        fetchModifiedData(view) {
            return {
                song: view.$songDom.val(),
                singer: view.$singerDom.val()
            };
        },
        updateData(modifiedData) {
            let modified = {
                song: false,
                singer: false
            };
            for (let key in modifiedData) {
                if (this.data[key] !== modifiedData[key]) {
                    this.data[key] = modifiedData[key];
                    modified[key] = true;
                }
            }
            if (modified.song || modified.singer) {
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
            view.render(model.template);
            this.bindEvents();
        },
        bindEvents() {
            EventsHub.subscribe('modify', (data) => {
                model.refreshData(data);
                view.show();
                view.render(model.generateTemporaryTemplate(model.template, model.data));
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
