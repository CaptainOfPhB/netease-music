/*
 * search-hottop.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    let view = {
        el: $('.top-search'),
        find(selector) {
            return this.el.find(selector);
        },
        render($dom, datas) {
            datas.map((data) => {
                $dom.append(data);
            })
        }
    };

    let model = {
        data: '',
        hottopTemplate: `
            <li>{{song}}</li>
        `,
        temporaryTemplate: [],
        refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        },
        fetchLeanCloudData() {
            let query = new AV.Query('SongList');
            return query.find().then(
                (songs) => {
                    model.data = songs.map((song, index) => {
                        if (index < 10) {
                            return {
                                id: song.id,
                                song: song.attributes.song,
                                singer: song.attributes.singer,
                                lyric: song.attributes.lyric,
                                cover: song.attributes.cover,
                                url: song.attributes.url
                            }
                        }
                    }).filter((song) => {
                        return song;
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
                this.temporaryTemplate.push(this.generateTemporaryTemplate(this.hottopTemplate, song));
            });
            return this.temporaryTemplate;
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
                    case 'lyric':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{lyric\}\}/g, data[key]);
                        break;
                    case 'cover':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{cover\}\}/g, data[key]);
                        break;
                }
            }
            return temporaryTemplate;
        },
    };

    let controller = {
        init() {
            model.fetchLeanCloudData().then(
                (data) => {
                    view.render(view.find('.top-serach-sample'), data);
                },
                (error) => {
                    console.log(error);
                }
            );
            this.bindEvents();
        },
        bindEvents() {
            EventsHub.subscribe('input', (data) => {
                if (data !== '') {
                    view.el.addClass('hide')
                } else {
                    setTimeout(() => {
                        view.el.removeClass('hide')
                    }, 200)
                }
            });
            view.find('.top-serach-sample').on('click', 'li', function () {
                EventsHub.publish('hottopSearch', view.find(this).text());
            })
        }
    };

    controller.init();

})();
