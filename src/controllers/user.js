import UserService from "../services/user.js";
import { Controller, RequestMapping, RequestMethod } from "../utils/decorator.js";

@Controller("/user")
export default class UserController {
	@RequestMapping(RequestMethod.POST, "/login")
	async login(ctx) {
		const userService = new UserService();
		const res = await userService.validate(ctx.request.body || {});
		ctx.body = { ...res };
	}
}
