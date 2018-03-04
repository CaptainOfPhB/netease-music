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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * welcome.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    // console.log('引入 welcome.js 成功！');

    var view = {
        el: $('.welcome-page'),
        render: function render(data) {
            this.el.append(data);
        },
        show: function show() {
            this.el.removeClass('hide');
        },
        hide: function hide() {
            this.el.addClass('hide');
        }
    };

    var model = {
        template: '\n            <div class="swiper-container">\n                <div class="swiper-wrapper">\n                    <div class="swiper-slide"></div>\n                    <div class="swiper-slide"></div>\n                    <div class="swiper-slide"></div>\n                    <div class="swiper-slide"></div>\n                    <div class="swiper-slide"></div>\n                    <div class="swiper-slide"></div>\n                    <div class="swiper-slide"></div>\n                    <div class="swiper-slide"></div>\n                </div>\n            </div>\n            <p class="welcome-info"><i class="iconfont icon-CN_NetEasemusic"></i>\u6B22\u8FCE\u4F7F\u7528\u7F51\u6613\u4E91\u97F3\u4E50\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF\uFF01</p>\n        '
    };

    var controller = {
        init: function init() {
            view.render(model.template);
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            EventsHub.subscribe('delete', function () {
                view.show();
            });
            EventsHub.subscribe('modify', function () {
                view.hide();
            });
            EventsHub.subscribe('new', function () {
                view.hide();
            });
            EventsHub.subscribe('edited', function () {
                view.show();
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });