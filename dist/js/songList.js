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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ({

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * song-list.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    var view = {
        el: $('.song-list > ul'),
        render: function render(datas) {
            var _this = this;

            datas.map(function (data) {
                _this.el.prepend(data);
            });
        },
        find: function find(selectorOrDom) {
            return this.el.find(selectorOrDom);
        },
        active: function active(dom) {
            this.el.find('li').map(function (index, domLi) {
                $(domLi).removeClass('active');
            });
            if (dom) {
                $(dom).addClass('active');
            }
        },
        blink: function blink(selector) {
            var _this2 = this;

            this.el.find(selector).addClass('blink');
            setTimeout(function () {
                if (_this2.el.find(selector)) {
                    _this2.el.find(selector).removeClass('blink');
                }
            }, 4000);
        },
        deleteElement: function deleteElement(element) {
            var _this3 = this;

            setTimeout(function () {
                _this3.el.find(element).remove();
            }, 3000);
        },
        fetchCurrentLiDom: function fetchCurrentLiDom(data) {
            return '#' + data;
        },
        clearCurrentLiDom: function clearCurrentLiDom(selector) {
            view.el.find(selector).empty();
        },
        updateCurrentLiDom: function updateCurrentLiDom(selector, templates) {
            var _this4 = this;

            templates.map(function (template) {
                _this4.el.find(selector).prepend(template);
            });
        }
    };

    var model = {
        data: {},
        template: '\n            <li id="{{id}}">\n                <p class="song" title="{{song}}"><a href="http://{{url}}" target="_blank">{{song}}</a></p>\n                <p class="singer" title="{{singer}}"><i class="iconfont icon-geshou"></i>{{singer}}</p>\n                <p class="lyric">{{lyric}}</p>\n                <p class="cover">{{cover}}</p>\n            </li>\n        ',
        templateSong: '<p class="song" title="{{song}}"><a href="http://{{url}}" target="_blank">{{song}}</a></p>',
        templateSinger: '<p class="singer" title="{{singer}}"><i class="iconfont icon-geshou"></i>{{singer}}</p>',
        templateLyric: '<p class="lyric">{{lyric}}</p>',
        templateCover: '<p class="cover">{{cover}}</p>',
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
        fetchLeanCloudData: function fetchLeanCloudData() {
            var _this5 = this;

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
                return _this5.showLeanCloudData();
            }, function (error) {
                console.log(error);
            });
        },
        showLeanCloudData: function showLeanCloudData() {
            var _this6 = this;

            this.data.map(function (song) {
                _this6.temporaryTemplate.push(_this6.generateTemporaryTemplate(_this6.template, song));
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
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            EventsHub.subscribe('edited', function (data) {
                model.refreshData(data);
                view.render([model.generateTemporaryTemplate(model.template, model.data)]);
                view.blink('li:first-child');
            });
            this.clickEvent();
            EventsHub.subscribe('uploading', function () {
                view.active();
            });
            EventsHub.subscribe('delete', function () {
                view.blink('.active');
                view.deleteElement('.active');
            });
            EventsHub.subscribe('update', function (data) {
                model.refreshData(data);
                view.blink(view.fetchCurrentLiDom(model.data.id));
                view.clearCurrentLiDom(view.fetchCurrentLiDom(model.data.id));
                var newtemplate = [model.generateTemporaryTemplate(model.templateLyric, model.data), model.generateTemporaryTemplate(model.templateCover, model.data), model.generateTemporaryTemplate(model.templateSinger, model.data), model.generateTemporaryTemplate(model.templateSong, model.data)];
                view.updateCurrentLiDom(view.fetchCurrentLiDom(model.data.id), newtemplate);
            });
        },
        clickEvent: function clickEvent() {
            view.el.on('click', 'li', function (event) {
                view.active(event.currentTarget);
                var $currentLi = view.find(event.currentTarget);
                EventsHub.publish('modify', {
                    id: $currentLi.attr('id'),
                    song: $currentLi.find('.song').text().trim(),
                    singer: $currentLi.find('.singer').text().trim(),
                    url: $currentLi.find('a').attr('href').trim(),
                    cover: $currentLi.find('.cover').text().trim(),
                    lyric: $currentLi.find('.lyric').text().trim()
                });
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });