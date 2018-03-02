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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * page-play.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    var view = {
        el: $('#page-play'),
        render: function render($el, data) {
            $el.empty().append(data);
        },
        find: function find(selector) {
            return this.el.find(selector);
        },
        show: function show() {
            this.el.addClass('show showPseudoElm');
        },
        hide: function hide() {
            this.el.removeClass('show');
        },
        changePlayPageBackground: function changePlayPageBackground(data) {
            this.el.css('background', 'url("' + data.cover + '")');
            this.el.css('background-repeat', 'no-repeat');
            this.el.css('background-size', 'cover');
            this.find('.cover').css('background', 'url("' + data.cover + '")');
            this.find('.cover').css('background-repeat', 'no-repeat');
            this.find('.cover').css('background-size', 'cover');
        }
    };

    var model = {
        data: '',
        audio: {},
        template: '\n            <section class="needle"></section>\n            <section class="svg-logo">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 88" data-reactid="90">\n                    <path fill-rule="evenodd" fill="#e60012" d="M0,17.171C0,7.688,7.819,0,17.466,0h54.583 c9.646,0,17.466,7.688,17.466,17.171v53.658c0,4.742-1.705,8.789-5.116,12.142c-3.411,3.354-7.527,5.03-12.351,5.03H17.466 C7.819,88.001,0,80.313,0,70.829V17.171z" data-reactid="91"></path>\n                    <path fill="#fff" d="m63.6 29c-2.874-1.817-6.396-2.814-10.02-2.993l-.808-2.892.024.027c-.031-.086-.059-.17-.086-.252l-.239-.855c-.552-2.473.454-3.653.969-4.078.088-.064.179-.129.277-.192 2.364-1.535 5.731.924 5.92 1.068 1.494 1.403 4.229 1.75 5.704.314 1.491-1.451 1.136-4.165-.354-5.617-2.32-2.258-9.443-5.885-15.504-1.951-5.45 3.537-5.558 8.515-4.662 11.392l1.086 3.893c-1.819.51-3.564 1.241-5.159 2.191-5.967 3.559-8.96 9.565-8.212 16.479.767 7.097 6.216 12.247 12.957 12.247 7.157 0 12.978-5.668 12.978-12.636-.097-1.664-.077-1.644-.307-3.131-.224-1.451-2.422-8.271-2.422-8.271 1.35.304 2.613.801 3.702 1.489 12.307 7.788 7.186 20.18 6.955 20.726-3.389 7.919-10.78 12.646-20.277 12.973-6.188.214-12.12-2.041-16.697-6.346-4.829-4.537-7.598-10.895-7.598-17.44 0-9.859 6.369-18.812 15.847-22.274 1.973-.722 3.567-2.776 2.476-5.162-.859-1.875-3.185-2.52-5.158-1.798-12.44 4.546-20.798 16.294-20.798 29.23 0 8.552 3.619 16.857 9.929 22.788 5.819 5.469 13.307 8.445 21.19 8.444.358 0 .719-.006 1.078-.018 12.422-.427 22.536-6.984 27.04-17.509 2.812-6.392 4.38-20.857-9.827-29.85m-12.768 16.15c0 2.868-2.397 5.202-5.344 5.202-3.271 0-5.073-2.898-5.365-5.592-.555-5.135 2.2-7.926 4.609-9.363.977-.582 2.051-1.038 3.172-1.369 0 0 2.598 8.05 2.801 9.297.223 1.379.127 1.825.127 1.825" data-reactid="92"></path>\n                    <g fill="#fff" data-reactid="93">\n                    <path d="m142.75 65.867c0 0-.516-4.094 0-4.726 11.981-14.67 11.718-34.407 11.718-34.407h7.344c-.126.678-3.794 25.512-19.06 39.13" data-reactid="94"></path>\n                    <path d="m162.48 65.867c0 0 .516-4.094 0-4.726-11.981-14.67-12.603-34.407-12.603-34.407h-7.345c.126.678 4.681 25.512 19.948 39.13" data-reactid="95"></path>\n                    <path d="m120.71 65.867c0 0-.515-4.094 0-4.726 11.981-14.67 12.644-34.407 12.644-34.407h7.345c-.126.678-4.721 25.512-19.989 39.13" data-reactid="96"></path>\n                    <path d="m140.44 65.867c0 0 .516-4.094 0-4.726-11.98-14.67-11.677-34.407-11.677-34.407h-7.345c.126.678 3.755 25.512 19.02 39.13" data-reactid="97"></path>\n                    <path d="m163.65 15.904h-45.905c-5.649-.067-7.345-.93-7.345-2.708 0 1.133 0 55.958 0 61.37h8.263v-54.15h41.31c2.741 0 4.591.871 4.591 3.61v43.32c0 2.523-1.514 3.124-8.996 3.947-.636.07-1.104 3.272-1.104 3.272h9.181c5.537 0 9.182-2.029 9.182-8.122v-42.42c0-6.093-3.645-8.123-9.182-8.123" data-reactid="98"></path>\n                    <path d="m259.13 21.319h58.759c-.166-2.751-.963-4.513-3.673-4.513h-58.759c.167 2.752.963 4.513 3.673 4.513" data-reactid="99"></path>\n                    <path d="m316.06 35.761h-62.43c.166 2.751.964 4.513 3.672 4.513h62.43c-.167-2.752-.963-4.513-3.672-4.513" data-reactid="100"></path>\n                    <path fill-rule="evenodd" d="m378.49 61.03h-37.642v-4.512h37.642v4.512" data-reactid="101"></path>\n                    <path d="m363.8 20.426v-6.318h-8.255v6.318h8.255" data-reactid="102"></path>\n                    <path d="m387.67 18.612h-59.678c.167 2.751.964 4.513 3.673 4.513h59.677c-.166-2.752-.963-4.513-3.672-4.513" data-reactid="103"></path>\n                    <path d="m389.51 35.761h-63.35c.166 2.751.963 4.513 3.673 4.513h63.35c-.166-2.752-.963-4.513-3.673-4.513" data-reactid="104"></path>\n                    <path d="m317.72 64.11c-1.168-4.204-3.503-12.11-3.503-12.11h-8.263c0 0 2.677 9.02 3.742 12.521.523 1.718.286 2.467.16 3.387-.326 2.373-1.394 2.144-3.902 2.144h-35.806c-4.287 0-4.971-3.768-4.361-5.528 2.349-6.791 8.263-24.368 8.263-24.368h-8.263c0 0-5.711 17.13-8.01 23.951-.566 1.68-.422 3.659-.25 4.479.924 4.414 4.279 5.979 8.951 5.979h43.15c4.672 0 7.272-1.567 8.196-5.981.173-.821.523-2.234-.101-4.479" data-reactid="105"></path>\n                    <path d="m376.65 42.98h-38.561c-3.396.032-5.509-.172-5.509-.902 0 0 0 21.352 0 26.18 0 6.094 2.727 6.317 8.264 6.317h45.904v-24.368c.0001-6.095-4.561-7.222-10.1-7.222m1.836 8.124v18.954h-33.97c-2.74 0-3.672-.643-3.672-2.707v-19.857h33.05c2.739 0 4.59-.237 4.59 1.805v1.805" data-reactid="106"></path>\n                    <path d="m344.52 31.25v-.902-2.708h-8.263v2.708c0 2.157.702 4.296 1.537 5.744h11.08c-2.74 0-4.357-2.104-4.357-4.842" data-reactid="107"></path>\n                    <path d="m383.08 30.346v-2.708h-8.263v2.708.902c0 2.738-1.617 4.842-4.362 4.842h11.1c.836-1.448 1.526-3.587 1.526-5.744" data-reactid="108"></path>\n                    <path d="m425.31 25.832v41.519c0 2.523-.153 3.124-7.634 3.947-.637.07-2.061 3.386-2.061 3.386h9.396c5.102 0 8.572-1.367 8.561-6.431-.026-11.852 0-42.42 0-42.42h-8.262" data-reactid="109"></path>\n                    <path d="m459.74 71.3c.586.993 0 1.354 0 1.354-5.779-1.489-13.224-9.586-15.15-22.45h8.263c-.0001-.0001 1.37 11.738 6.885 21.1" data-reactid="110"></path>\n                    <path fill-rule="evenodd" d="m234.35 29.432h-35.818v-4.492h35.818v4.492" data-reactid="111"></path>\n                    <path d="m233.43 15.904h-34.888c-6.191 0-8.263-.859-8.263-2.708 0 1.133 0 11.732 0 17.15 0 6.093 1.809 9.02 7.345 9.02h35.807 9.181v-15.343c-.002-6.093-3.646-8.123-9.182-8.123m.918 18.953h-32.13c-2.741 0-3.672-.871-3.672-3.609v-10.831h32.13c2.74 0 3.672-.032 3.672 2.708v11.732" data-reactid="112"></path>\n                    <path d="m205.2 46.25c-3.938 5.417-12.175 14.665-23.18 20.2-.637.319-2.384 1.805-1.836 1.805 1.147 0 .479 0 3.672 0 7.262 0 27.05-13.988 29.609-22h-8.263" data-reactid="113"></path>\n                    <path d="m223.1 46.25c-4.625 10.639-14.276 21.563-26.854 27.08-.654.286-1.926 1.24-1.377 1.24 1.376 0 2.066 0 2.754 0 8.409 0 29.902-12.262 33.741-28.317h-8.264" data-reactid="114"></path>\n                    <path d="m247.2 53.02c0-6.095-3.645-10.944-9.181-10.944h-43.15c-1.977-.045-3.645-.172-4.132-1.241-.352-.771-1.376-.676-1.376-.676-1.069 6.146-2.452 10.509-8.263 13.538-.25.105-1.524 1.292-.688 1.354 1.619.119 4.143-.324 5.508-.677 3.185-.823 6.293-4.333 8.952-7.785h39.479c2.757.011 4.59.984 4.59 3.724v9.477c0 4.106-.745 11.507-14.502 11.507-.64 0-1.104 3.272-1.104 3.272h7.345c9.767 0 16.525-3.325 16.525-15.456v-6.093z" data-reactid="115"></path>\n                    <path d="m455.61 39.37h-43.15c-2.741 0-4.344.015-4.132-2.595.224-2.775 1.377-17.262 1.377-17.262 3.71-.003 31.04-.176 46.13-1.016.884-.05.896-4.114 0-4.062-15.1.884-46.13.563-46.13.563h-8.264c0 0-.927 15.14-1.376 21.1-.453 6.01 3.186 7.785 8.722 7.785h50.5c-.165-2.75-.962-4.511-3.672-4.511" data-reactid="116"></path>\n                    <path d="m398.69 71.3c-.585.993 0 1.354 0 1.354 5.778-1.489 13.682-9.586 15.608-22.45h-8.264c0-.0001-1.829 11.738-7.344 21.1" data-reactid="117"></path>\n                </g>\n                </svg>\n                <span class="return-btn">\n                    <svg viewBox="0 0 1119 1024" xmlns="http://www.w3.org/2000/svg" fill="#FEFEFE" height="20px">\n                        <path d="M264.865886 79.334764C282.636584 60.294737 281.607586 30.453733 262.567559 12.683048 243.527518-5.08765 213.686528-4.058651 195.91583 14.981376L16.510046 207.201873C-5.513203 230.798201-5.493491 267.749578 16.510046 291.324793L195.91583 483.54529C213.686528 502.585317 243.527518 503.614316 262.567559 485.843618 281.607586 468.072933 282.636584 438.231929 264.865886 419.191902 264.865886 419.191902 152.71292 288.384418 153.600094 288.384418L1022.652726 288.384418 1022.652726 921.647576 126.652726 921.647576C100.608135 921.647576 79.494831 942.760879 79.494831 968.80547 79.494831 994.850061 100.608135 1015.963365 126.652726 1015.963365L1042.947449 1015.963365C1083.866705 1015.963365 1116.968515 982.728273 1116.968515 941.829942L1116.968515 268.202051C1116.968515 227.227661 1083.825071 194.068628 1042.886373 194.068628L153.734966 194.068628 264.865886 79.334764Z"></path>\n                    </svg>\n                </span>\n            </section>\n            <section class="song-wrap">\n                <div class="song-disc rotate">\n                    <div class="cover" data-bind="{{cover}}"></div>\n                </div>\n            </section>\n            <section id="{{id}}" class="song-info">\n                <p class="song">{{song}}&nbsp;-&nbsp;{{singer}}</p>\n                <div class="song-scroll">\n                    <div class="lyric">\n                        <p>\u6211\u662F\u4E0D\u662F\u4F60\u6700\u75BC\u7231\u7684\u4EBA</p>\n                        <p class="active">\u6211\u662F\u4E0D\u662F\u4F60\u6700\u75BC\u7231\u7684\u4EBA</p>\n                        <p>\u6211\u662F\u4E0D\u662F\u4F60\u6700\u75BC\u7231\u7684\u4EBA</p>\n                    </div>\n                    <audio class="audio" src="http://{{url}}" autoplay></audio>\n                </div>\n            </section>\n            <section class="controller"> </section>\n        ',
        templateAudio: '\n            <div class="process-bar">\n                <span class="start">00:00</span>\n                <div class="process">\n                    <div class="slide-block"></div>\n                </div>\n                <span class="end">{{minute}}:{{second}}</span>\n            </div>\n            <div class="ctrl-bar">\n                <span class="prev-btn">\n                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#DDDDDD" width="25px">\n                        <path d="M368.633054 511.913509 886.983222 880.591085 886.983222 140.60107 368.633054 511.913509 368.633054 511.913509ZM882.604932 20.349647C940.780017-21.173341 987.940243 2.876064 987.940243 74.233986L987.940243 948.452606C987.940243 1019.735085 940.695386 1043.799518 882.604932 1002.336931L300.041815 586.527324C241.866731 545.004336 241.951362 477.621856 300.041815 436.159268L882.604932 20.349647 882.604932 20.349647ZM36.059757 55.942218C36.059757 28.247587 58.716488 5.796664 86.538267 5.796664 114.416784 5.796664 137.016778 28.249938 137.016778 55.942218L137.016778 973.854431C137.016778 1001.549062 114.360047 1024 86.538267 1024 58.65975 1024 36.059757 1001.546711 36.059757 973.854431L36.059757 55.942218 36.059757 55.942218Z"></path>\n                    </svg>\n                </span>\n                <span class="play-pause-btn">\n                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#DDDDDD" width="50px">\n                        <path d="M512 0C229.216 0 0 229.216 0 512c0 282.768 229.216 512 512 512 282.752 0 512-229.232 512-512C1024 229.216 794.752 0 512 0zM512 992C246.896 992 32 777.088 32 512 32 246.896 246.896 32 512 32c265.056 0 480 214.896 480 480C992 777.088 777.056 992 512 992z"></path>\n                        <path d="M821.152 518.112c0.432-1.008 0.832-1.984 1.024-3.056 0.224-1.072 0.24-2.096 0.224-3.152 0-0.96-0.016-1.872-0.192-2.816-0.224-1.2-0.656-2.272-1.136-3.392-0.24-0.544-0.256-1.136-0.56-1.664-0.16-0.256-0.4-0.4-0.56-0.64-0.656-0.992-1.488-1.824-2.336-2.672-0.704-0.672-1.344-1.344-2.128-1.872-0.32-0.208-0.48-0.528-0.816-0.704l-457.264-264c-0.288-0.16-0.608-0.16-0.896-0.304-0.976-0.48-2-0.736-3.056-1.024-1.04-0.272-2.032-0.56-3.088-0.624-0.336-0.016-0.608-0.192-0.96-0.192-0.688 0-1.296 0.32-1.968 0.4-1.104 0.128-2.144 0.288-3.184 0.64-0.992 0.336-1.84 0.816-2.736 1.328-0.88 0.496-1.712 0.992-2.496 1.68-0.848 0.72-1.488 1.568-2.16 2.448-0.4 0.528-0.976 0.896-1.328 1.488-0.176 0.304-0.16 0.624-0.32 0.928-0.464 0.944-0.72 1.968-1.008 3.008-0.288 1.056-0.576 2.064-0.64 3.136-0.016 0.336-0.192 0.608-0.192 0.944l0 528.032c0 0.336 0.176 0.608 0.192 0.928 0.064 1.072 0.352 2.112 0.64 3.168 0.288 1.04 0.528 2.048 0.992 2.992 0.16 0.304 0.144 0.624 0.32 0.928 0.336 0.592 0.912 0.96 1.328 1.504 0.672 0.88 1.328 1.712 2.16 2.448 0.784 0.672 1.632 1.184 2.528 1.68 0.88 0.512 1.712 0.992 2.688 1.312 1.072 0.368 2.144 0.528 3.264 0.656 0.656 0.096 1.232 0.384 1.904 0.384 0.336 0 0.608-0.176 0.928-0.192 1.072-0.064 2.096-0.352 3.168-0.64 1.04-0.288 2.048-0.528 2.992-0.992 0.304-0.16 0.64-0.144 0.928-0.32l457.248-264c0.32-0.192 0.48-0.48 0.784-0.688 0.848-0.56 1.552-1.28 2.288-2.016 0.8-0.784 1.584-1.552 2.176-2.464 0.192-0.272 0.464-0.416 0.64-0.72C820.88 519.392 820.912 518.72 821.152 518.112zM365.408 275.696 774.672 512 365.408 748.304 365.408 275.696z"></path>\n                    </svg>\n                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#DDDDDD" width="50px">\n                        <path d="M512 0C229.6832 0 0 229.6832 0 512s229.6832 512 512 512 512-229.6832 512-512S794.3168 0 512 0z m0 989.866667C248.507733 989.866667 34.133333 775.492267 34.133333 512S248.507733 34.133333 512 34.133333s477.866667 214.3744 477.866667 477.866667-214.3744 477.866667-477.866667 477.866667z"></path>\n                        <path d="M563.2 785.066667h136.533333V238.933333h-136.533333v546.133334z m34.133333-512h68.266667v477.866666h-68.266667V273.066667zM324.266667 785.066667h136.533333V238.933333h-136.533333v546.133334z m34.133333-512h68.266667v477.866666h-68.266667V273.066667z"></path>\n                    </svg>\n                </span>\n                <span class="next-btn">\n                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#DDDDDD" width="25px">\n                        <path d="M653.37642 507.671377 142.223095 873.297309 142.223095 139.432403 653.37642 507.671377 653.37642 507.671377ZM146.540596 20.176336C89.173222-21.002958 42.667775 2.847382 42.667775 73.61466L42.667775 940.597118C42.667775 1011.289587 89.256678 1035.154832 146.540596 994.035441L721.015329 581.66759C778.382703 540.48831 778.299247 473.663579 721.015329 432.544188L146.540596 20.176336 146.540596 20.176336ZM981.332225 55.474301C981.332225 28.008908 958.990063 5.743802 931.554565 5.743802 904.063117 5.743802 881.776905 28.011241 881.776905 55.474301L881.776905 965.788696C881.776905 993.254089 904.119067 1015.519195 931.554565 1015.519195 959.046013 1015.519195 981.332225 993.251756 981.332225 965.788696L981.332225 55.474301 981.332225 55.474301Z"></path>\n                    </svg>\n                </span>\n            </div>\n        ',
        refreshData: function refreshData(data) {
            this.data = JSON.parse(JSON.stringify(data));
        },
        fetchAudioData: function fetchAudioData(dom) {
            var time = this.formatTime(dom.duration);
            this.audio = {
                duraiton: Math.floor(dom.duration),
                minute: time.minite,
                second: time.second
            };
        },
        formatTime: function formatTime(time) {
            var tempTime = {
                minite: Math.floor(time / 60) + '',
                second: Math.floor(time % 60) + ''
            };
            for (var key in tempTime) {
                if (tempTime[key].length < 2) {
                    tempTime[key] = '0' + tempTime[key];
                }
            }
            return tempTime;
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
                    case 'minute':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{minute\}\}/g, data[key]);
                        break;
                    case 'second':
                        temporaryTemplate = temporaryTemplate.replace(/\{\{second\}\}/g, data[key]);
                        break;
                }
            }
            return temporaryTemplate;
        }
    };

    var controller = {
        data: {
            isPlaying: true
        },
        init: function init() {
            this.bindEvents();
        },
        bindEvents: function bindEvents() {
            var _this = this;

            this.hidePlayPage();
            this.pauseAndPlay();
            EventsHub.subscribe('playMusic', function (data) {
                model.refreshData(data);
                view.render(view.el, model.generateTemporaryTemplate(model.template, model.data));

                _this.bindAudioEvent();
            });
        },
        showPlayPage: function showPlayPage() {
            view.show();
            this.preventScroll();
        },
        hidePlayPage: function hidePlayPage() {
            view.el.on('click', '.return-btn', function () {
                view.hide();
            });
        },
        bindAudioEvent: function bindAudioEvent() {
            var _this2 = this;

            view.find('.audio').on('play', function () {
                model.fetchAudioData(view.find('audio')[0]);
                view.render(view.find('.controller'), model.generateTemporaryTemplate(model.templateAudio, model.audio));
                // this.showPlayedTime();


                view.changePlayPageBackground(model.data);
                _this2.showPlayPage();
            });
        },
        pauseAndPlay: function pauseAndPlay() {
            var _this3 = this;

            view.el.on('click', '.play-pause-btn', function () {
                view.el.toggleClass('playing pause');
                _this3.data.isPlaying ? view.find('audio')[0].pause() : view.find('audio')[0].play();
                _this3.data.isPlaying = !_this3.data.isPlaying;
            });
        },
        showPlayedTime: function showPlayedTime() {
            var timer = 0;
            timer = setTimeout(function clock() {
                var currentTime = view.find('.start').text();
            });
            console.log(currentTime);
        },
        preventScroll: function preventScroll() {
            view.el.on('touchmove', function (e) {
                e.preventDefault();
            });
        }
    };

    controller.init();
})();

/***/ })

/******/ });