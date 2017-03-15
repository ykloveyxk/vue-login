const express = require('express')
const model = require('../db/db.js')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const createToken = require('../middleware/createToken.js')
const sha1 = require('sha1')
const checkToken = require('../middleware/checkToken.js')

const Register = (req, res) => {
	let User_register = new model.User({
		email: req.body.email,
		password: sha1(req.body.password),
		recheck: req.body.recheck,
		token: createToken(this.email)
	})

	// 将 objectid 转换为 用户创建时间
	User_register.create_time = moment(objectIdToTimestamp(User_register._id))
		.format('YYYY-MM-DD HH:mm:ss');

	// 查找已注册用户，用户名存在则不能注册
	model.User.findOne({
		email: (User_register.email)
			.toLowerCase()
	}, (err, doc) => {
		if(err) console.log(err)
		if(doc) {
			res.json({
				success: false
			})
		} else {
			User_register.save(err => {
				if(err) console.log(err)
				console.log('register success')
				res.json({
					success: true
				})
			})
		}
	})
}

const Login = (req, res) => {
	let User_login = new model.User({
		email: req.body.email,
		password: sha1(req.body.password)
	})
	console.log(User_login)
	model.User.findOne({ email: User_login.email }, (err, doc) => {
		if(err) console.log(err)
		if(!doc) {
			console.log("账号不存在");
			res.json({
				info: false
			})
		} else if(User_login.password === doc.password) {
			console.log('登录成功')
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
			console.log('密码错误')
			res.json({
				success: false
			})
		}
	})
}

const User = (req, res) => {
	model.User.find({}, (err, doc) => {
		if(err) console.log(err)
		res.send(doc)
	})
}

const delUser = (req, res) => {
	console.log(req.body.id)
	model.User.findOneAndRemove({ _id: req.body.id }, err => {
		if(err) console.log(err)
		console.log('删除用户成功')
		res.json({
			success: true
		})
	})
}

module.exports = (router) => {
	router.post('/register', Register),
		router.post('/login', Login),
		router.get('/user', User),
		router.post('/delUser', delUser)
}
