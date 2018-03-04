/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * page-remd.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    var view = {
        el: $('#page-remd .song-list'),
        render: function render(datas) {
            var _this = this;

            datas.map(function (data) {
                _this.el.prepend(data);
            });
        }
    };

    var model = {
        data: '',
        template: '\n            <li id="{{id}}" class="item-common">\n                <div class="song-info">\n                    <p class="song">{{song}}</p>\n                    <p class="singer">\n                        <svg class="SQsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"\n                         fill="#FE672E">\n                        <path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z"></path>\n                        <path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z"></path>\n                        <path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z"></path>\n                    </svg>\n                        {{singer}}\n                    </p>\n                    <p class="url hide">{{url}}</p>\n                    <p class="lyric hide">{{lyric}}</p>\n                    <img src="{{cover}}" class="cover hide" width="1px" height="1px">\n                </div>\n                <div class="playsvg">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"\n                     fill="#AAAAAA">\n                    <path d="M512 0C229.376 0 0 229.376 0 512S229.376 1024 512 1024c282.616633 0 512-229.376 512-512S794.616633 0 512 0z m0 984.528115c-247.292317 0-472.528115-225.228432-472.528115-472.528115S264.707683 39.471885 512 39.471885s472.528115 225.228432 472.528115 472.528115-225.235799 472.528115-472.528115 472.528115z"></path>\n                    <path d="M408.524432 311.185496l302.757755 201.838504-302.757755 201.838504z"></path>\n                    <path d="M408.524432 725.912863a11.065094 11.065094 0 0 1-11.05036-11.050359V311.185496a11.05036 11.05036 0 0 1 17.179626-9.193899L717.411453 503.822734a11.057727 11.057727 0 0 1 0 18.387798L414.653698 724.056403a11.065094 11.065094 0 0 1-6.129266 1.85646z m11.050359-394.077928v362.37813l271.787281-181.196432-271.787281-181.181698z"></path>\n                </svg>\n            </div>\n            </li>\n        ',
        temporaryTemplate: [],
        refreshData: function refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        },
        generateTemporaryTemplate: function generateTemporaryTemplate(temporaryTemplate, data) {
            for (var key in data) {
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
        fetchLeanCloudData: function fetchLeanCloudData() {
            var _this2 = this;

            var query = new AV.Query('SongList');
            return query.find().then(function (songs) {
                model.data = songs.map(function (song) {
                    return {
                        id: song.id,
                        song: song.attributes.song,
                        singer: song.attributes.singer,
                        lyric: song.attributes.lyric,
                        cover: song.attributes.cover,
                        url: song.attributes.url
                    };
                });
                return _this2.showLeanCloudData();
            }, function (error) {
                console.log(error);
            });
        },
        showLeanCloudData: function showLeanCloudData() {
            var _this3 = this;

            this.data.map(function (song) {
                _this3.temporaryTemplate.push(_this3.generateTemporaryTemplate(_this3.template, song));
            });
            return this.temporaryTemplate;
        }
    };

    var controller = {
        init: function init() {
            model.fetchLeanCloudData().then(function (data) {
                view.render(data);
            }, function (error) {
                console.log(error);
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });