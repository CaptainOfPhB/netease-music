/*
 * admin.js
 * Copyright (C) 2018 daijt
 *
 * Distributed under terms of the MIT license.
 */

import '../style/admin.scss';

(function () {
    'use strict';

    // console.log('引入 admin.js 成功！');

    const appId = '3lYwUmOrkdkkv4zmxHzDbp3w-gzGzoHsz';
    const appKey = '5KWyRdYSGUIjOYDMirAnfDJ4';
    AV.init({ appId, appKey });

    let mySwiper = new Swiper ('.swiper-container', {
        autoplay: {
            delay: 5000,
        },
        effect: 'fade',
    })
})();
