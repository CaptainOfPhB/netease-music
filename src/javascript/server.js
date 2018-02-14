let http = require('http');
let fs = require('fs');
let url = require('url');
let port = process.argv[2];
let qiniu = require('qiniu');


if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
  process.exit(1);
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if(path === '/uptoken'){

    var accessKey = '1ivt588ApcFSvsX3e3uikY1qok3ayQKuPQusHu58';
    var secretKey = 'Q98SD4eWvV2tD__9XAuR2tcX8Jh7VgMeFXfxi6a9';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
      scope: 'neteasemusic'
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.write(`
      {
        "uptoken": "${uploadToken}"
      }
    `);
    response.end();
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      {
        "error": "not found"
      }
    `)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请打开 http://localhost:' + port)
