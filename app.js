const Koa = require('koa');
const middleware = require('./middleware');
const fs = require('fs');
const views = require('koa-views');
const hbs = require('handlebars');
const layouts = require('handlebars-layouts');
const static = require('koa-static');
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

middleware(app);



// 注册组件
hbs.registerPartial('layout', fs.readFileSync('./views/layout.hbs', 'utf8'));

// 注册Layout
hbs.registerHelper(layouts(hbs));
hbs.registerHelper(renderJson(hbs));

module.exports = app;