const express = require('express')
const model = require('../db/db.js')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const createToken = require('../middleware/createToken.js')
const sha1 = require('sha1')
// const checkToken = require('../middleware/checkToken.js')

const Register = function (req, res) {
	let User_register = new model.Register({
		email: req.body.email,
		password: sha1(req.body.password),
		recheck: req.body.recheck
	})
	User_register.save((err) => {
		if(err) console.log(err)
		console.log('register success')
		res.json({
			success: true
		})
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
		} else if(req.body.password === doc.password) {
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

module.exports = (router) => {
	router.post('/register', Register),
		router.post('/login', Login)
}
