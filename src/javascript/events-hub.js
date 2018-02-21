/*
 * eventsHub.js
 * Copyright (C) 2018 daijt <daijt@david.local>
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    // console.log('引入 events-hub.js 成功！');

    window.EventsHub = {
        events: {},
        subscribe(eventName, callback) {
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            this.events[eventName].push(callback);
            console.log(`成功订阅 ${eventName} 事件！`);
        },
        publish(eventName, data) {
            if (this.events[eventName] && this.events[eventName].length) {
                this.events[eventName].map((callback) => {
                    callback(data);
                })
            } else {
                console.log(`无人订阅 ${eventName} 事件！`);
            }
        }
    };

})();
