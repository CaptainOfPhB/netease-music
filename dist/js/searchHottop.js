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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * search-hottop.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    var view = {
        el: $('.top-search'),
        find: function find(selector) {
            return this.el.find(selector);
        },
        render: function render($dom, datas) {
            datas.map(function (data) {
                $dom.append(data);
            });
        }
    };

    var model = {
        data: '',
        hottopTemplate: '\n            <li>{{song}}</li>\n        ',
        temporaryTemplate: [],
        refreshData: function refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        },
        fetchLeanCloudData: function fetchLeanCloudData() {
            var _this = this;

            var query = new AV.Query('SongList');
            return query.find().then(function (songs) {
                model.data = songs.map(function (song, index) {
                    if (index < 10) {
                        return {
                            id: song.id,
                            song: song.attributes.song,
                            singer: song.attributes.singer,
                            lyric: song.attributes.lyric,
                            cover: song.attributes.cover,
                            url: song.attributes.url
                        };
                    }
                }).filter(function (song) {
                    return song;
                });
                return _this.showLeanCloudData();
            }, function (error) {
                console.log(error);
            });
        },
        showLeanCloudData: function showLeanCloudData() {
            var _this2 = this;

            this.data.map(function (song) {
                _this2.temporaryTemplate.push(_this2.generateTemporaryTemplate(_this2.hottopTemplate, song));
            });
            return this.temporaryTemplate;
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
        }
    };

    var controller = {
        init: function init() {
            model.fetchLeanCloudData().then(function (data) {
                view.render(view.find('.top-serach-sample'), data);
            }, function (error) {
                console.log(error);
            });
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            EventsHub.subscribe('input', function (data) {
                if (data !== '') {
                    view.el.addClass('hide');
                } else {
                    setTimeout(function () {
                        view.el.removeClass('hide');
                    }, 200);
                }
            });
            view.find('.top-serach-sample').on('click', 'li', function () {
                EventsHub.publish('hottopSearch', view.find(this).text());
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });