/*
 * index.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */
import '../style/normalize.css';
import '../style/index.scss';
// http://music.163.com/api/song/media?id=424496753 歌词 API
// https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=xxxxx 歌曲 API
// https://api.imjad.cn/cloudmusic/?type=playlist&id=309390784 歌单 API

(function () {
    'use strict';

    // set REM
    $('head').prepend(`
        <style>
            html {
                font-size: ${window.innerWidth / 20}px;
            }
        </style>
    `);

    // initial LeanCloud
    const appId = '3lYwUmOrkdkkv4zmxHzDbp3w-gzGzoHsz';
    const appKey = '5KWyRdYSGUIjOYDMirAnfDJ4';
    AV.init({ appId, appKey });

})();
