var jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
	console.log(req.headers['authorization']);
	var token = req.headers['authorization'].split(' ')[1]
	var decoded = jwt.decode(token, 'salt')
	// 如果过期了就重新登录
	if(token && decoded.exp <= Date.now() / 1000) {
		return res.send({
			code: 401,
			message: "授权已经过期，请重新登陆"
		})
	}
	next();
}
