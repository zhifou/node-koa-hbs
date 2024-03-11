
let { QINIU } = require('../config/index');
let qiniu = require('qn');

module.exports = {
    async fe(ctx) {

        // ctx.body = 'hello fe';
        await ctx.render('index', {
            title: 'dddddddd',
            description: 'aaa',
            keywords: 'ddd'

        });
    },
    backend(ctx) {
        ctx.body = 'hello backend';
    },
    post(ctx) {
        let accessKey =  QINIU.accessKey;
        let secretKey = QINIU.secretKey;
        let bucket = QINIU.bucket;
        // let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        console.log(accessKey);

        var client = qiniu.create({
            accessKey: accessKey,
            secretKey: secretKey,
            bucket: bucket,
            // origin: 'http://{bucket}.u.qiniudn.com',
            // timeout: 3600000, // default rpc timeout: one hour, optional
            // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
            // uploadURL: 'http://up.qiniu.com/',
        });
        let filePath = '/Users/zhaoyadong/Pictures/nasa.jpg';
        // upload a file with custom key
        client.uploadFile(filePath, {key: 'nasa.jpg'}, function (err, result) {
            console.log(result);
            // {
            //   hash: 'FhGbwBlFASLrZp2d16Am2bP5A9Ut',
            //   key: 'qn/lib/client.js',
            //   url: 'http://qtestbucket.qiniudn.com/qn/lib/client.js'
            //   "x:ctime": "1378150371",
            //   "x:filename": "client.js",
            //   "x:mtime": "1378150359",
            //   "x:size": "21944",
            // }
        });
    },
    list(ctx) {
        let accessKey =  QINIU.accessKey;
        let secretKey = QINIU.secretKey;
        let bucket = QINIU.bucket;
        // let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        console.log(accessKey);

        let client = qiniu.create({
            accessKey: accessKey,
            secretKey: secretKey,
            bucket: bucket,
            // origin: 'http://{bucket}.u.qiniudn.com',
            // timeout: 3600000, // default rpc timeout: one hour, optional
            // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
            // uploadURL: 'http://up.qiniu.com/',
        });
        // list
        client.list('/', function (err, result) {
            console.log(result);
            // marker: 'eyJjIjowLCJrIjoicW4vYmlnLnR4dCJ9'
            // items: [
            //   {
            //     fsize: 21944,
            //     putTime: 13783144546186030,
            //     key: 'qn/logo.png',
            //     hash: 'FvzqAF1oWlYgQ9t62k_xn_mzZ1Ki',
            //     mimeType: 'image/png'
            //   }, ...
            // ]
        });
    },
    getJSON(ctx) {
        // 如果jsonp 的请求为GET
        if(ctx.method === 'GET' && ctx.url.split('?')[0] ==='/getData.jsonp'){

            // 获取jsonp的callback
            let callbackName = ctx.query.callback || 'callback';
            let returnData = {
                success: true,
                data: {
                    text: 'this is a jsonp api',
                    time: new Date().getTime(),
                }
            };

            // jsonp的script字符串
            let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;

            // 用text/javascript，让请求支持跨域获取
            ctx.type = 'text/javascript';

            //输出jsonp字符串
            ctx.body = jsonpStr;
        } else {
            ctx.body = 'hello jsonp';
        }
    }
};