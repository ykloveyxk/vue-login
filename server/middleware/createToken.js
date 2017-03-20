var jwt = require('jsonwebtoken')
module.exports = function (name) {
	// 有效期为 1h
	const token = jwt.sign({
		name: name
	}, 'secret', { expiresIn: '10s' });
	return token;
}
