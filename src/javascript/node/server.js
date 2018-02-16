/*
 * server.js
 * Copyright (C) 2018 daijt <daijt@david.local>
 *
 * Distributed under terms of the MIT license.
 */
(function () {
    'use strict';

    let http = require('http');
    let fs = require('fs');
    let url = require('url');
    let port = process.argv[2];
    let qiniu = require('qiniu');

    if (!port) {
        console.log('请指定端口号!');
        process.exit(1);
    }

    let server = http.createServer(function (request, response) {
        let parsedUrl = url.parse(request.url, true);
        let pathWithQuery = request.url;
        let queryString = '';
        if (pathWithQuery.indexOf('?') >= 0) {
            queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
        }
        let path = parsedUrl.pathname;
        let query = parsedUrl.query;
        let method = request.method;

        /******** 从这里开始看，上面不要看 ************/

        if (path === '/uptoken') {
            let qiniuKey = fs.readFileSync('../../../qiniu-config.json');
            let config = JSON.parse(qiniuKey);
            let mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
            let options = {
                scope: 'neteasemusic'
            };
            let putPolicy = new qiniu.rs.PutPolicy(options);
            let uploadToken = putPolicy.uploadToken(mac);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.write(`
                {
                    "uptoken": "${uploadToken}"
                }
            `);
            response.end();
        } else {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html;charset=utf-8');
            response.write(`
                {
                    "error": "not found"
                }
            `);
            response.end()
        }
    });

    server.listen(port);
    console.log('监听 ' + port + ' 端口成功，请打开 http://localhost:' + port);
})();
