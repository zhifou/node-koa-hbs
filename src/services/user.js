import { signature } from "../utils/jwt";

const mockUserTable = [
	{ username: "zhangsan", password: "123456" },
	{ username: "lisi", password: "654321" },
	{ username: "admin", password: "111111" },
	{ username: "huangzq", password: "hzq666" },
];

export default class UserService {
	async validate({ username, password }) {
		if (username && password) {
			let findValue = mockUserTable.find((item) => item.username === username);
			if (findValue) {
				let findValue = mockUserTable.find(
					(item) => item.username === username && item.password === password,
				);
				if (findValue) {
					// 登录成功
					return {
						code: 200,
						msg: "登录成功",
						status: "success",
						data: { token: signature({ username }) },
					};
				} else {
					return {
						code: 200,
						msg: "密码错误",
						status: "failed",
						data: void 0,
					};
				}
			} else {
				return {
					code: 200,
					msg: "用户名错误",
					status: "failed",
					data: void 0,
				};
			}
		} else {
			return {
				code: 200,
				msg: "用户名或密码不能为空",
				status: "failed",
				data: void 0,
			};
		}
	}
}
