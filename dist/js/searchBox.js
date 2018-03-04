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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * search-box.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    var view = {
        el: $('.search-area'),
        find: function find(selector) {
            return this.el.find(selector);
        },
        render: function render(data) {
            this.el.append(data);
        }
    };

    var model = {
        data: '',
        template: '\n            <span class="search-icon">\n                <svg class="searchsvg" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-spm-anchor-id="a313x.7781069.0.i1" width="18px">\n                    <path d="M416 192C537.6 192 640 294.4 640 416S537.6 640 416 640 192 537.6 192 416 294.4 192 416 192M416 128C256 128 128 256 128 416S256 704 416 704 704 576 704 416 576 128 416 128L416 128z" fill="#BBBBBB"></path>\n                    <path d="M832 864c-6.4 0-19.2 0-25.6-6.4l-192-192c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0l192 192c12.8 12.8 12.8 32 0 44.8C851.2 864 838.4 864 832 864z" fill="#BBBBBB"></path>\n                </svg>\n            </span>\n            <label><input id="search" type="text" placeholder="\u641C\u7D22\u6B4C\u66F2"></label>\n            <span class="clear-button hide-btn">\n                <svg class="closesvg" viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg" width="14px">\n                    <path d="M513.344 0a512 512 0 1 0 0 1024 512 512 0 0 0 0-1024z m226.048 674.624l-54.528 56.896-171.52-164.928-171.392 164.928-54.592-56.896L456.576 512 287.36 349.312l54.592-56.768 171.392 164.8 171.52-164.8 54.528 56.768L570.176 512l169.216 162.624z" fill="#BBBBBB"></path>\n                </svg>\n            </span>\n        ',
        refreshData: function refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        }
    };

    var controller = {
        init: function init() {
            view.render(model.template);
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            this.bindInputBoxEvent();
            this.bindClearBtnEvent();
        },
        bindInputBoxEvent: function bindInputBoxEvent() {
            view.el.on('input', '#search', function () {
                if ($(this).val() !== '') {
                    EventsHub.publish('showClearBtn', '显示清除按钮！');
                } else {
                    EventsHub.publish('hideClearBtn', '隐藏清除按钮！');
                }
                EventsHub.publish('input', $(this).val());
            });
            EventsHub.subscribe('clear', function () {
                view.find('#search').val('');
                EventsHub.publish('input', '');
            });
            EventsHub.subscribe('hottopSearch', function (data) {
                EventsHub.publish('input', data);
                view.find('#search').val(data);
                EventsHub.publish('showClearBtn', '显示清除按钮！');
            });
        },
        bindClearBtnEvent: function bindClearBtnEvent() {
            view.find('.clear-button').on('click', function () {
                EventsHub.publish('clear', '清除输入框！');
                $(this).addClass('hide-btn');
            });
            EventsHub.subscribe('showClearBtn', function () {
                view.find('.clear-button').removeClass('hide-btn');
            });
            EventsHub.subscribe('hideClearBtn', function () {
                view.find('.clear-button').addClass('hide-btn');
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });