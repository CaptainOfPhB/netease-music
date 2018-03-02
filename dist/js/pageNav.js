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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * page-nav.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    var view = {
        el: $('#page-navigation'),
        render: function render(data) {
            this.el.append(data);
        },
        find: function find(selector) {
            return this.el.find(selector);
        },
        show: function show($dom) {
            view.find('.item span').map(function (index, spanDom) {
                $(spanDom).removeClass('active');
            });
            $dom.addClass('active');
        }
    };

    var model = {
        data: '',
        template: '\n            <nav id="nav-tab">\n                <div class="item">\n                    <span data-bind-page=".page-remd" id="tab-remd" class="page-remd active">\u63A8\u8350\u97F3\u4E50</span>\n                </div>\n                <div class="item">\n                    <span data-bind-page=".page-hottop" class="page-hottop" id="tab-hottop">\u70ED\u6B4C\u699C</span>\n                </div>\n                <div class="item">\n                    <span data-bind-page=".page-search" class="page-search" id="tab-search">\u641C\u7D22</span>\n                </div>\n            </nav>\n        ',
        refreshData: function refreshData() {}
    };

    var controller = {
        init: function init() {
            view.render(model.template);
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            view.find('#nav-tab').on('click', 'span', function (event) {
                view.show($(event.currentTarget));
                EventsHub.publish('switchTab', $(event.currentTarget).attr('data-bind-page'));
            });
            EventsHub.subscribe('contact', function (data) {
                view.show(view.find(data));
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });