/*
 * index.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
import '../style/normalize.css';
import '../style/index.scss';

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
