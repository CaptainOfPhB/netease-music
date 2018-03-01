/*
 * song-list.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    let view = {
        el: $('.song-list > ul'),
        render(datas) {
            datas.map((data) => {
                this.el.prepend(data);
            });
        },
        find(selectorOrDom) {
           return this.el.find(selectorOrDom);
        },
        active(dom) {
            this.el.find('li').map((index, domLi) => {
                $(domLi).removeClass('active');
            });
            if (dom) {
                $(dom).addClass('active');
            }
        },
        blink(selector) {
            this.el.find(selector).addClass('blink');
            setTimeout(() => {
                if (this.el.find(selector)) {
                    this.el.find(selector).removeClass('blink');
                }
            }, 4000);
        },
        deleteElement(element) {
            setTimeout(() => {
                this.el.find(element).remove();
            }, 3000)
        },
        fetchCurrentLiDom(data) {
            return `#${data}`;
        },
        clearCurrentLiDom(selector) {
            view.el.find(selector).empty();
        },
        updateCurrentLiDom(selector, templates) {
            templates.map((template) => {
                this.el.find(selector).prepend(template);
            });
        }
    };

    let model = {
        data: {},
        template: `
            <li id="{{id}}">
                <p class="song" title="{{song}}"><a href="http://{{url}}" target="_blank">{{song}}</a></p>
                <p class="singer" title="{{singer}}"><i class="iconfont icon-geshou"></i>{{singer}}</p>
                <p class="lyric">{{lyric}}</p>
                <p class="cover">{{cover}}</p>
            </li>
        `,
        templateSong: `<p class="song" title="{{song}}"><a href="http://{{url}}" target="_blank">{{song}}</a></p>`,
        templateSinger: `<p class="singer" title="{{singer}}"><i class="iconfont icon-geshou"></i>{{singer}}</p>`,
        templateLyric: `<p class="lyric">{{lyric}}</p>`,
        templateCover: `<p class="cover">{{cover}}</p>`,
        temporaryTemplate: [],
        refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        },
        generateTemporaryTemplate(temporaryTemplate, data) {
            for (let key in data) {
                switch (key) {
                    case 'id':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{id\}\}/g, data[key]);
                        break;
                    case 'song':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{song\}\}/g, data[key]);
                        break;
                    case 'singer':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{singer\}\}/g, data[key]);
                        break;
                    case 'url':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{url\}\}/g, data[key]);
                        break;
                    case 'cover':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{cover\}\}/g, data[key]);
                        break;
                    case 'lyric':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{lyric\}\}/g, data[key]);
                        break;
                }
            }
            return temporaryTemplate;
        },
        fetchLeanCloudData() {
            let query = new AV.Query('SongList');
            return query.find().then(
                (songs) => {
                    model.data = songs.map((song) => {
                        return {
                            id: song.id,
                            song: song.attributes.song,
                            singer: song.attributes.singer,
                            lyric: song.attributes.lyric,
                            cover: song.attributes.cover,
                            url: song.attributes.url,
                        }
                    });
                    return this.showLeanCloudData();
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        showLeanCloudData() {
            this.data.map((song) => {
                this.temporaryTemplate.push(this.generateTemporaryTemplate(this.template, song));
            });
            return this.temporaryTemplate;
        }
    };

    let controller = {
        init() {
            model.fetchLeanCloudData().then(
                (data) => {
                    view.render(data);
                },
                (error) => {
                    console.log(error);
                }
            );
            this.bindEvents();
        },
        bindEvents() {
            EventsHub.subscribe('edited', (data) => {
                model.refreshData(data);
                view.render([model.generateTemporaryTemplate(model.template, model.data)]);
                view.blink('li:first-child');
            });
            this.clickEvent();
            EventsHub.subscribe('uploading', () => {
                view.active();
            });
            EventsHub.subscribe('delete', () => {
                view.blink('.active');
                view.deleteElement('.active');
            });
            EventsHub.subscribe('update', (data) => {
                model.refreshData(data);
                view.blink(view.fetchCurrentLiDom(model.data.id));
                view.clearCurrentLiDom(view.fetchCurrentLiDom(model.data.id));
                let newtemplate = [
                    model.generateTemporaryTemplate(model.templateLyric, model.data),
                    model.generateTemporaryTemplate(model.templateCover, model.data),
                    model.generateTemporaryTemplate(model.templateSinger, model.data),
                    model.generateTemporaryTemplate(model.templateSong, model.data)
                ];
                view.updateCurrentLiDom(view.fetchCurrentLiDom(model.data.id), newtemplate);
            });
        },
        clickEvent() {
            view.el.on('click', 'li', (event) => {
                view.active(event.currentTarget);
                let $currentLi = view.find(event.currentTarget);
                EventsHub.publish('modify', {
                    id: $currentLi.attr('id'),
                    song: $currentLi.find('.song').text().trim(),
                    singer: $currentLi.find('.singer').text().trim(),
                    url: $currentLi.find('a').attr('href').trim(),
                    cover: $currentLi.find('.cover').text().trim(),
                    lyric: $currentLi.find('.lyric').text().trim()
                });
            })
        }
    };

    controller.init();

})();
