const KoaRouter = require('koa-router');
const router = new KoaRouter();
const koaCompose = require('koa-compose');
const hello = require('../controller/hello');
const upload = require('../controller/upload');
const wate = require('../controller/wate');

module.exports = () => {
    router.get('/fe', hello.fe);
    router.post('/fe/post', hello.post);
    router.get('/fe/list', hello.list);
    router.get('/backend', hello.backend);
    router.get('/wate', wate.wate);
    router.get('/upload', upload.fileUpload);
    return koaCompose([router.routes(), router.allowedMethods()]);
};