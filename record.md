import Koa from "koa";

import Router from "koa-router";

import Routers from "./controllers/index"; // 导入 controllers 作为路由

import { controllers } from "./utils/decorator.js"; // 导入 controllers，里面有具体的 method, path, handler

const app = new Koa();

const router = new Router();

const allPath = [];

Routers.forEach((route) => {
	const currRoute = controllers.find((item) => item.constructor === route);

	if (!currRoute) return;

	let { method, path, handler } = currRoute;

	const { prefix } = route;

	if (prefix) path = prefix + path;

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

const port = 3001;

app.listen(port, () => {
	console.log(`server is running at http://localhost:${port}`);
});
