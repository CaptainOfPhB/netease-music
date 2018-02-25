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
 * song-edit.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    // console.log('引入 song-edit.js 成功！');

    var view = {
        el: $('.edit-page'),
        init: function init() {},
        render: function render(data) {
            this.el.empty().append(data);
        },
        show: function show() {
            this.el.removeClass('hide');
        },
        hide: function hide() {
            this.el.addClass('hide');
        }
    };

    var model = {
        data: {
            id: '',
            song: '',
            singer: '',
            url: ''
        },
        template: '\n            <p class="tip">\u4E0A\u4F20\u6210\u529F\uFF01\u8BF7\u7F16\u8F91\u6B4C\u66F2\u4FE1\u606F\uFF01</p>\n            <div class="edit-area ">\n                <label>\u97F3\u4E50\u6807\u9898\uFF1A<input type="text" name="song" value="{{song}}"></label>\n                <label>\u6B4C\u624B\uFF1A<input type="text" name="singer" value="{{singer}}"></label>\n                <label>\u6B4C\u66F2\u5916\u94FE\uFF1A<input type="text" name="url" value="{{url}}" disabled></label>\n                <div class="confirm">\u786E&nbsp;&nbsp;\u5B9A</div>\n            </div>\n        ',
        temporaryTemplate: '',
        init: function init() {
            this.temporaryTemplate = this.template;
        },
        refreshData: function refreshData(data) {
            Object.assign(this.data, JSON.parse(JSON.stringify(data)));
        },
        generateTemporaryTemplate: function generateTemporaryTemplate() {
            for (var key in this.data) {
                this.temporaryTemplate = this.temporaryTemplate.replace('{{' + key + '}}', this.data[key]);
            }
        },
        getLatestData: function getLatestData(element) {
            for (var key in this.data) {
                this.data[key] = element.find('input[name=' + key + ']').val() || '暂无';
            }
        }
    };

    var controller = {
        init: function init() {
            model.init();
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            EventsHub.subscribe('uploaded', function (data) {
                model.refreshData(data);
                EventsHub.publish('editing', '用户正在编辑歌曲！');
                model.generateTemporaryTemplate();
                view.render(model.temporaryTemplate);
                view.show();
            });
            this.edited();
        },
        edited: function edited() {
            var _this = this;

            view.el.on('click', '.confirm', function () {
                model.getLatestData(view.el);
                _this.uploadLeanCloud(model.data);
            });
        },
        uploadLeanCloud: function uploadLeanCloud(data) {
            var Songs = AV.Object.extend('SongList');
            var song = new Songs();
            for (var key in data) {
                if (key !== 'id') {
                    song.set(key, data[key]);
                }
            }
            song.save().then(function (editedSong) {
                model.data.id = editedSong.id;
                view.hide();
                EventsHub.publish('edited', model.data);
            }, function (error) {
                console.error(error);
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });