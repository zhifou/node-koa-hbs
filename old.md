const Koa = require('koa');
const static = require('koa-static');
const session = require('koa-session');
const views = require('koa-views');
const fs = require('fs');
const hbs = require('handlebars');
const middleware = require('./middleware');
const layouts = require('handlebars-layouts');
const renderJson = require('./utils/helper/renderjson');

const app = new Koa();

app.use(views(__dirname + '/views', {
    extension: 'hbs',
    map: {
        hbs: 'handlebars'
    }
}));

app.use(require('koa-bodyparser')());
app.use(static(__dirname + '/static'));

const CONFIG = {
    key: 'koa:sess',       /** 默认 */
    maxAge: 10 * 60 * 1000,     /**  cookie的过期时间10分钟 */
    overwrite: true,            /** (boolean) can overwrite or not (default true)    没有效果，默认 */
    httpOnly: true,             /**  true表示只有服务器端可以获取cookie */
    signed: true,               /** 默认 签名 */
    rolling: true,              /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
    renew: true,               /** (boolean) renew session when session is nearly expired      【需要修改】*/
};

app.use(session(CONFIG, app));

middleware(app);



// 注册组件
hbs.registerPartial('layout', fs.readFileSync('./views/layout.hbs', 'utf8'));
hbs.registerPartial('layout-md', fs.readFileSync('./views/layout-md.hbs', 'utf8'));

// 注册Layout
hbs.registerHelper(layouts(hbs));
hbs.registerHelper(renderJson(hbs));

module.exports = app;