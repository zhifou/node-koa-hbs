const crypto = require("crypto");

/**
 * 生成JWT令牌
 *
 * @param payload 令牌负载
 * @param salt 加密盐
 * @returns 返回JWT令牌字符串
 */
function sign(payload, salt) {
	// 定义头部信息
	const header = { type: "JWT", alg: "HS256" };

	// 创建一个空数组用于存储令牌
	const tokenArr = [];

	// 第一段：将头部信息编码为Base64Url格式并添加到令牌数组中
	tokenArr.push(base64UrlEncode(JSON.stringify(header)));

	// 第二段：将负载信息编码为Base64Url格式并添加到令牌数组中
	tokenArr.push(base64UrlEncode(JSON.stringify(payload)));

	// 第三段：将前两段拼接后的字符串进行加密，并将加密结果添加到令牌数组中
	tokenArr.push(encryption(tokenArr.join("."), salt));

	// 将令牌数组中的元素用"."连接并返回
	return tokenArr.join(".");
}

/**
 * 将字符串进行base64Url编码
 *
 * @param str 待编码的字符串
 * @returns 返回base64Url编码后的字符串
 */
function base64UrlEncode(str) {
	return Buffer.from(str).toString("base64");
}

function encryption(value, salt) {
	return crypto.createHmac("sha256", salt).update(value).digest("base64");
}

/**
 * 验证token是否有效
 *
 * @param token 需要验证的token
 * @param salt 加密时使用的盐值
 * @returns 返回布尔值，表示token是否有效
 */
function verify(token, salt) {
	// 将token按"."分割成header、payload和signature三部分
	const [header, payload, signature] = token.split(".");
	// 将header和payload拼接成字符串，并使用salt进行加密
	// 返回加密后的结果是否与signature相等
	return encryption([header, payload].join("."), salt) === signature;
}

const salt = "<huangzq>";
const token = sign({ user: "hzq" }, salt);

console.log("[ token ] >", token);

console.log("[ verify() ] >", verify(token, salt));

// 终端进入该文件夹，运行 node ./mockJWT.js
// 打印结果：
// [ token ] > eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ==.eyJ1c2VyIjoiaHpxIn0=.WOckAZBwACMtmAFXTBb3vRsY0J2Lef1S80WMU/RJUvg=
// [ verify() ] > true
