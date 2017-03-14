var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/kk')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function () {
	console.log('mongodb is running')
})

var registerSchema = mongoose.Schema({
	email: String,
	password: String,
	recheck: String,
	token: String,
	create_time: Date
})

var loginSchema = mongoose.Schema({
	email: String,
	password: String
})

var model = {
	Login: mongoose.model('Login', loginSchema),
	Register: mongoose.model('Register', registerSchema)
}

module.exports = model
