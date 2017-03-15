const express = require('express')
const model = require('../db/db.js')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const createToken = require('../middleware/createToken.js')
const sha1 = require('sha1')
const checkToken = require('../middleware/checkToken.js')

const Register = function (req, res) {
	console.log(req.body)
	let User_register = new model.Register({
		email: req.body.email,
		password: sha1(req.body.password),
		recheck: req.body.recheck,
		token: createToken(this.email)
	})
	User_register.create_time = moment(objectIdToTimestamp(User_register._id))
		.format('YYYY-MM-DD HH:mm:ss');
	model.Register.findOne({ email: (User_register.email)
			.toLowerCase() }, function (err, doc) {
		if(err) console.log(err)
		if(doc) {
			res.json({
				success: false
			})
		} else {
			User_register.save((err) => {
				if(err) console.log(err)
				console.log('register success')
				res.json({
					success: true
				})
			})
		}
	})
}

const Login = function (req, res) {
	let User_login = new model.Register({
		email: req.body.email,
		password: sha1(req.body.password)
	})

	model.Register.findOne({ email: User_login.email }, function (err, doc) {
		if(err) console.log(err)
		if(doc == null) {
			console.log("账号不存在");
			res.json({
				info: false
			})
		} else if(User_login.password === doc.password) {
			console.log('login success')
			var name = req.body.email;
			res.json({
				success: true,
				email: doc.email,
				// 账户创建日期
				time: moment(objectIdToTimestamp(doc._id))
					.format('YYYY-MM-DD HH:mm:ss'),
				// token 信息验证
				token: createToken(name)
			})
		} else {
			console.log('password error')
			res.json({
				success: false
			})
		}
	})
}

const User = function (req, res) {
	model.Register.find({}, function (err, doc) {
		if(err) console.log(err)
		res.send(doc)
	})
}

const Del_user = (req, res) => {
	console.log(req.body.id)
	model.Register.findOneAndRemove({ _id: req.body.id }, function (err) {
		if(err) console.log(err)
		console.log('删除成功')
		res.json({
			success: true
		})
	})
}

module.exports = (router) => {
router.post('/register', Register),
	router.post('/login', Login),
	router.get('/user', User),
	router.post('/del_user', Del_user)
}
)
}
