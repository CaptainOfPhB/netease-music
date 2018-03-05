const path = require('path');
// 引入 html-webpack-plugin，编译 html 文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 extract-text-webpack-plugin，将 CSS 生成单个的文件，而不是内嵌到页面中
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Jarvis = require("webpack-jarvis");

module.exports = {
    entry: {
        // 公共 chunk 文件
        eventsHub: './src/javascript/events-hub.js',
        // 手机端页面
        index: './src/javascript/index.js',
        contactMe: './src/javascript/contact-me.js',
        pageNav: './src/javascript/page-nav.js',
        pageContainer: './src/javascript/page-container.js',
        pageRemd: './src/javascript/page-remd.js',
        pageHottop: './src/javascript/page-hottop.js',
        pagePlay: './src/javascript/page-play.js',
        searchBox: './src/javascript/search-box.js',
        searchHottop: './src/javascript/search-hottop.js',
        searchResult: './src/javascript/search-result.js',
        // 管理页面
        moxie: './src/javascript/vendor/moxie.js',
        plupload: './src/javascript/vendor/plupload.min.js',
        qiniu: './src/javascript/vendor/qiniu.min.js',
        admin: './src/javascript/admin.js',
        profile: './src/javascript/profile.js',
        welcome: './src/javascript/welcome.js',
        songEdit: './src/javascript/song-edit.js',
        songList: './src/javascript/song-list.js',
        songNew: './src/javascript/song-new.js',
        songShow: './src/javascript/song-show.js',
        songUpload: './src/javascript/song-upload.js',
    },
    output: {
        // 编译后 js 的名称，[name].js 即为保留编译前文件的名称，[name].[hash].js 即将 原名称 + hash 作为编译后文件的名称
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js') // 编译后 js 文件存储的路径
    },
    // devServer: {
    //     contentBase: path.resolve(__dirname, 'dist'),
    //     host: 'localhost',
    //     compress: true,
    //     port: 8080
    // },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../html/admin.html', // 处理后的 html 文件名称
            template: './src/html/admin.html', // 需要处理的 html 文件，即模板
            chunks: ['moxie', 'plupload', 'qiniu', 'eventsHub', 'welcome', 'admin', 'profile', 'songShow', 'songList', 'songEdit', 'songUpload', 'songNew', /* 'otherJS' */], // chunks，即该 html 模板中需要引入的 js，名称与上面 entry 中的 key 一致则表示引入
            chunksSortMode: 'manual',
            inject: 'body', // 布尔值或者 ‘body‘、’head’，设置 script 引入的位置
            hash: true, // chunk 的 hash 值，若为 true，则默认在 chunk 文件后面添加 “？ + hash”
            minify: { // html 压缩优化选项
                removeComments: true, //移除 html 中的注释
                // removeAttributeQuotes: true, // 移除属性的引号
                // collapseWhitespace: true // 删除空白符与换行符，效果为将 html 全部压缩为一行
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../html/index.html', // 处理后的 html 文件名称
            template: './src/html/index.html', // 需要处理的 html 文件，即模板
            chunks: ['eventsHub', 'index', 'contactMe', 'pageNav', 'pageContainer', 'pageRemd', 'pageHottop', 'pagePlay', 'searchBox', 'searchHottop', 'searchResult'], // chunks，即该 html 模板中需要引入的 js，名称与上面 entry 中的 key 一致则表示引入
            chunksSortMode: 'manual',
            inject: 'body', // 布尔值或者 ‘body‘、’head’，设置 script 引入的位置
            hash: true, // chunk 的 hash 值，若为 true，则默认在 chunk 文件后面添加 “？ + hash”
            minify: { // html 压缩优化选项
                removeComments: true, //移除 html 中的注释
                // removeAttributeQuotes: true, // 移除属性的引号
                // collapseWhitespace: true // 删除空白符与换行符，效果为将 html 全部压缩为一行
            }
        }),
        new Jarvis({
            port: 1337 // optional: set a port
        })
    ],
    module: {
        rules: [
            // babel-loader
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            // 导入 CSS
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 导入 SCSS
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            // 导入
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // 导入字体文件
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // 导入 CSV
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            // 导入 XML
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },

};
