/*
 * index.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
import '../style/normalize.css';
import '../style/index.scss';
// http://music.163.com/api/song/media?id=531051217 API

(function () {
    'use strict';

    // 设置 REM
    $('head').prepend(`
        <style>
            html {
                font-size: ${window.innerWidth / 20}px;
            }
        </style>
    `);

})();
