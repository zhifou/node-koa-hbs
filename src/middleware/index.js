const routes = require("../routes");

module.exports = (app) => {
    app.use(routes());
    
    //  找地方加上这一段手写代码，也可以使用 @koa/cors 库来处理跨域
    app.use(async (ctx, next) => {
        ctx.set("Acess-Control-Allow-Origin", "*"); // 允许与给定的来源（origin）共享。
        ctx.set(
            "Access-Control-Allow-Headers",
            "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
        ); // 允许的请求头。

        ctx.set(
            "Access-Control-Allow-Methods",
            "OPTIONS, GET, POST, PUT, DELETE"
        ); // 允许使用的方法或方法列表。

        ctx.set("Content-Type", "application/json"); // 设置响应的 Content-Type 头，与跨域无关，只是放在一起写了

        if (ctx.request.method === "OPTIONS") {
            ctx.status = 200; // 状态码为 200，表示请求成功
        } else await next();
    });
};
