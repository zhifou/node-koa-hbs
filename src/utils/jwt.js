import jwt from "jsonwebtoken";

const SALT = "<Huangzq666>";

export const verify = async (token) => {
	return new Promise((resolve) => {
		if (token) {
			jwt.verify(token, SALT, (err, data) => {
				if (err) {
					if (err.name === "TokenExpiredError") {
						resolve({
							status: "failed",
							error: "token 已过期",
						});
					} else {
						resolve({
							status: "failed",
							error: " 认证识别",
						});
					}
				} else {
					resolve({
						status: "success",
						data,
					});
				}
			});
		} else {
			resolve({
				status: "failed",
				error: "token 不能为空",
			});
		}
	});
};

// 加密
export const signature = (data) => {
	return jwt.sign(data, SALT, {
		expiresIn: "10h", // 秒
	});
};

export const jwtVerify =
	(whiteList = []) =>
	async (ctx, next) => {
		if (whiteList.includes(ctx.path)) {
			return next(ctx);
		} else {
			// 不是白名单，则需要进行校验
			let token;
			try {
				token = ctx.header.authorization.split("Bearer ")[1];
			} catch (error) {
				// todo
			}

			const res = await verify(token);

			if (res.status === "success") {
				return next(ctx);
			} else {
				ctx.body = {
					...res,
					code: 401,
				};
			}
		}
	};
