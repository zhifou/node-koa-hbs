import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import Routers from "./src/controllers/index.js"; // 导入 controllers 作为路由
import { controllers } from "./src/utils/decorator.js"; // 导入 controllers，里面有具体的 method, path, handler
import { jwtVerify } from "./src/utils/jwt.js";

const app = new Koa();

const router = new Router();

const API_PREFIX = "/api";
const allPath = [];

Routers.forEach((route) => {
    const currRoute = controllers.find((item) => item.constructor === route);

    if (!currRoute) return;

    let { method, path, handler } = currRoute;

    const { prefix } = route;

    if (prefix) path = prefix + path;

	const finalPath = API_PREFIX + path;

    allPath.push({ method, path });

    router[method](path, handler);
});

router.get("/", async (ctx) => {
    let body = "";

    allPath.forEach((item) => {
        body += `<a href='${item.path}'>${item.method}: ${item.path}</a><br>`;
    });

    ctx.body = body;
});

app.use(router.routes());
//  找地方加上这一段手写代码，也可以使用 @koa/cors 库来处理跨域
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*"); // 允许与给定的来源（origin）共享。
    ctx.set(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
    ); // 允许的请求头。

    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE"); // 允许使用的方法或方法列表。

    ctx.set("Content-Type", "application/json"); // 设置响应的 Content-Type 头，与跨域无关，只是放在一起写了

    if (ctx.request.method === "OPTIONS") {
        ctx.status = 200; // 状态码为 200，表示请求成功
    } else await next();
});
// 使用 jwt 验证中间件
app.use(jwtVerify(["/", "/api/user/login", "/api/user/register"]));
app.use(bodyParser());


const port = 3001;

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`);
});

// export default app;