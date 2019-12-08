# node + koa2 + handlebars 实现后台工程搭建
## 工程代码结构
```shell
.
├── README.md
├── app.js
├── bin
│   └── www
├── config
│   └── index.js
├── controller
│   ├── db.js
│   ├── hello.js
│   ├── md.js
│   ├── upload.js
│   └── wate.js
├── dao
│   ├── mysql.js
│   └── redis.js
├── middleware
│   └── index.js
├── package.json
├── routes
│   └── index.js
├── static
│   ├── css
│   │   ├── bootstrap.min.css
│   │   ├── layout.css
│   │   ├── material-icons.css
│   │   └── md.css
│   ├── fonts
│   │   ├── MaterialIcons-Regular.eot
│   │   ├── MaterialIcons-Regular.svg
│   │   ├── MaterialIcons-Regular.ttf
│   │   ├── MaterialIcons-Regular.woff
│   │   ├── MaterialIcons-Regular.woff2
│   │   ├── Oswald-Bold.ttf
│   │   ├── Oswald-ExtraLight.ttf
│   │   ├── Oswald-Light.ttf
│   │   ├── Oswald-Medium.ttf
│   │   ├── Oswald-Regular.ttf
│   │   └── Oswald-SemiBold.ttf
│   └── js
│       └── echarts.min.js
├── upload
│   ├── index.md
│   └── message.txt
├── utils
│   └── helper
│       └── renderjson.js
└── views
    ├── db
    │   └── index.hbs
    ├── fileupload.hbs
    ├── index.hbs
    ├── layout-md.hbs
    ├── layout.hbs
    ├── md
    │   └── index.hbs
    └── wate.hbs
```

## 功能模块
### handlebars模板渲染
```
配置文件package.json
{{!-- package.json --}}
"dependencies": {
  "handlebars": "^4.0.11",
  "handlebars-layouts": "^3.1.4"
}

模板配置
{{!-- index.html --}}
{{#extend "layout-md"}}
    {{#content "header"}}
        <script></script>
    {{/content}}
    {{#content "main" mode="append"}}
        {{{container}}}
    {{/content}}
    {{#content "footer" mode="prepend"}}
        <script></script>
    {{/content}}
{{/extend}}
```
### md文件读取渲染
```
配置文件package.json
{{!-- package.json --}}
"dependencies": {
  "marked": "0.7.0"
}

/**
 * @file 读取md文档的controller
 * @author packjs@163.com
 */
const marked = require('marked');

let filePath = path.join(__dirname, '../upload/index.md');
console.log(filePath);

let data = await new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
        if(err) {
            reject(err);
            return
        }
        resolve(data);
    })
});
await ctx.render('md/index', {
    title: 'dddddddd',
    description: 'aaa',
    keywords: 'ddd',
    container: marked(data.toString())
});   
```
### material-icons字体库
```
<link rel="stylesheet" href="/css/material-icons.css">
<i class="material-icons">arrow_drop_down</i>
```
### mysql数据库
```
配置文件package.json
{{!-- package.json --}}
"dependencies": {
  "mysql": "^2.17.1"
}

{{!-- mysql.js --}}
const mysql = require('mysql');

const pool = mysql.createPool({
    host     :  '127.0.0.1',
    user     :  'root',
    password :  '',
    database :  'my_database'
});

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        });
    });
};

module.exports = { query };
```
### redis的NoSql
```
配置文件package.json
{{!-- package.json --}}
"dependencies": {
  "redis": "^2.8.0"
}

{{!-- redis.js --}}
const redis = require("redis");

const client = redis.createClient(({
    port: "6379",
    host: "localhost"
}));

client.set('hello', 'I am redis content.', redis.print);

client.get('hello', (err, reply) => {
    console.log('Error %s', err);
    console.log('Reply %s', reply);
});

module.exports = client;
```
### renderJson的渲染前端脚本对象
```
{{!-- renderJson.js --}}
/**
 * Generates an object of renderjson helpers.
 *
 * @type {Function}
 * @param {Object} handlebars Handlebars instance.
 * @return {Object} Object of helpers.
 */
function renderJson(handlebars) {
    let helpers = {
        /**
         * @method renderJson
         * @param {Object} items
         * @param {String} objectName
         * @param {Object} options
         * @return {String} Rendered partial.
         */
        renderJson: function (items, objectName, options) {
            console.log(objectName);
            let ret = JSON.stringify(items);
            let out = `<script>
                        let ${objectName} = ${ret};
                   </script>`;
            return out;
        }


    };

    return helpers;
}

/**
 * Registers layout helpers on a Handlebars instance.
 *
 * @method register
 * @param {Object} handlebars Handlebars instance.
 * @return {Object} Object of helpers.
 * @static
 */
renderJson.register = function (handlebars) {
    let helpers = renderJson(handlebars);

    handlebars.registerHelper(helpers);

    return helpers;
};

module.exports = renderJson;

{{!-- controller.js --}}
await ctx.render('wate', {
    title: 'dddddddd',
    description: 'aaa',
    keywords: 'ddd',
    count: set.size,
    list: fmapArr,
    axis: {X: aX, Y: aY}
});

{{!-- index.hbs --}}
{{#renderJson axis 'abTestObj'}}
{{/renderJson}}
```
## 链接赞助
- **node + express + handlebars** ：[node-express-handlebars][1]
- **node + express + jade** ：[node-express-jade][2]
- **node + typescript** ：[node-typescript][3]
- **图标字体库** ：[palicon][4]
- **基于Vue的UI组件库** ：[pallas][5]
- **浏览器新api** ：[request-idle-callback][6]
[1]: https://github.com/packjs/node-express-handlebars
[2]: https://github.com/packjs/node-express-jade
[3]: https://github.com/packjs/node-typescript
[4]: https://github.com/packjs/palicon
[5]: https://github.com/packjs/pallas
[6]: https://github.com/packjs/request-idle-callback