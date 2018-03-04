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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 26:
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
        template: '\n            <div class="edit-area ">\n                <label>\u6B4C\u66F2\u540D\u79F0</label>\n                <input type="text" class="song" name="song" value="{{song}}">\n                <label>\u6B4C\u624B</label>\n                <input type="text" class="singer" name="singer" value="{{singer}}">\n                <label>\u6B4C\u8BCD</label>\n                <textarea class="lyric" name="lyric" cols="30" rows="5"">{{lyric}}</textarea>\n                <label>\u6B4C\u66F2\u5C01\u9762\u94FE\u63A5</label>\n                <input type="text" class="cover" name="cover" value="{{cover}}">\n                <label>\u6B4C\u66F2\u5916\u94FE</label>\n                <input type="text" class="url" name="url" value="{{url}}" disabled>\n                <div class="button-wrapper">\n                    <div class="confirm">\u786E&nbsp;&nbsp;\u5B9A</div>\n                </div>\n            </div>\n        ',
        temporaryTemplate: '',
        initTemporaryTemplate: function initTemporaryTemplate() {
            this.temporaryTemplate = this.template;
        },
        refreshData: function refreshData(data) {
            Object.assign(this.data, JSON.parse(JSON.stringify(data)));
        },
        generateTemporaryTemplate: function generateTemporaryTemplate() {
            this.initTemporaryTemplate();
            for (var key in this.data) {
                this.temporaryTemplate = this.temporaryTemplate.replace('{{' + key + '}}', this.data[key]);
            }
        },
        getLatestData: function getLatestData(element) {
            for (var key in this.data) {
                this.data[key] = element.find('.' + key).val() || '暂无';
            }
        }
    };

    var controller = {
        init: function init() {
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            EventsHub.subscribe('uploaded', function (data) {
                model.refreshData(data);
                EventsHub.publish('editing', '用户正在编辑歌曲！');
                model.generateTemporaryTemplate();
                view.render(model.temporaryTemplate);
                view.show();
                alertify.alert("歌曲上传成功！请编辑歌曲信息！");
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