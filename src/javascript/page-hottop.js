/*
 * page-hottop.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    let view = {
        el: $('#page-hottop .song-list'),
        render(datas) {
            datas.map((data) => {
                this.el.append(data);
            });
        },
    };

    let model = {
        data: '',
        template: `
            <li id="{{id}}" class="item-common" data-url="{{url}}" data-lyric="{{lyric}}">
                <span class="order">{{index}}</span>
                <div class="song-wrapper">
                    <div class="song-info">
                        <p class="song">{{song}}</p>
                        <p class="singer">
                            <svg class="SQsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                             fill="#FE672E">
                            <path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z"></path>
                            <path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z"></path>
                            <path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z"></path>
                        </svg>
                            {{singer}} 
                        </p>
                    </div>
                    <div class="playsvg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="#AAAAAA">
                            <path d="M512 0C229.376 0 0 229.376 0 512S229.376 1024 512 1024c282.616633 0 512-229.376 512-512S794.616633 0 512 0z m0 984.528115c-247.292317 0-472.528115-225.228432-472.528115-472.528115S264.707683 39.471885 512 39.471885s472.528115 225.228432 472.528115 472.528115-225.235799 472.528115-472.528115 472.528115z"></path>
                            <path d="M408.524432 311.185496l302.757755 201.838504-302.757755 201.838504z"></path>
                            <path d="M408.524432 725.912863a11.065094 11.065094 0 0 1-11.05036-11.050359V311.185496a11.05036 11.05036 0 0 1 17.179626-9.193899L717.411453 503.822734a11.057727 11.057727 0 0 1 0 18.387798L414.653698 724.056403a11.065094 11.065094 0 0 1-6.129266 1.85646z m11.050359-394.077928v362.37813l271.787281-181.196432-271.787281-181.181698z"></path>
                        </svg>
                    </div>
                </div>
            </li>
        `,
        temporaryTemplate: [],
        refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        },
        generateTemporaryTemplate(temporaryTemplate, data, indexString) {
            if (indexString.length === 1) {
                indexString = `0${indexString}`;
            }
            temporaryTemplate = temporaryTemplate.replace('{{index}}', indexString);
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
            this.data.map((song, index) => {
                this.temporaryTemplate.push(this.generateTemporaryTemplate(this.template, song, index + 1 + ''));
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

        }
    };

    controller.init();

})();
