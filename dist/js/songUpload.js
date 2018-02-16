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
 * song-upload.js
 * Copyright (C) 2018 daijt <daijt@david.local>
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    console.log('引入 song-upload.js 成功！');

    var view = {
        el: $('.upload-page'),
        render: function render() {}
    };

    var model = {
        // data: ,
        // template: ``
    };

    var controller = {
        init: function init() {
            this.initQiniu();
            this.bindEvents();
        },
        initQiniu: function initQiniu() {
            var uploadArea = view.el.find('#upload-area');
            var uploader = Qiniu.uploader({
                runtimes: 'html5',
                browse_button: 'upload-button',
                uptoken_url: 'http://localhost:8888/uptoken',
                domain: 'p3zj54rve.bkt.clouddn.com',
                container: 'upload-area',
                max_file_size: '100MB',
                dragdrop: true,
                drop_element: 'upload-area',
                chunk_size: '4MB',
                auto_start: true,
                init: {
                    'UploadProgress': function UploadProgress() {
                        uploadArea.addClass('uploading');
                    },
                    'FileUploaded': function FileUploaded(up, file, info) {
                        uploadArea.removeClass('uploading');

                        var _JSON$parse = JSON.parse(info.response),
                            key = _JSON$parse.key;

                        var data = {
                            song: key,
                            singer: '',
                            url: up.getOption('domain') + '/' + key
                        };
                        EventsHub.publish('uploaded', data);
                    }
                }
            });
        },
        bindEvents: function bindEvents() {
            EventsHub.subscribe('new', function () {
                view.el.removeClass('hide');
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });