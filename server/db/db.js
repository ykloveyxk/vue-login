const mongoose = require('mongoose')
const config = require('config-lite')

// mongodb 连接🔗
mongoose.connect(config.mongodb)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function () {
	console.log('Mongodb started successfully')
})

var userSchema = mongoose.Schema({
	email: String,
	password: String,
	recheck: String,
	token: String,
	create_time: Date
})

var model = {
	// 可以在此处扩展 model，例如：
	// Article: mongoose.model('Article', articleSchema),
	User: mongoose.model('User', userSchema)
}

module.exports = model
