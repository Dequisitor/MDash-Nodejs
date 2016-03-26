express = require 'express'
router = express.Router()
repo = require './repository'
config = require './config'
isAuth = require './restricted.router'
jwt = require 'jsonwebtoken'
passwd = require 'password-hash'

sendSuccess = (res, data) =>
	res.json {
		success: true,
		result: data
	}
	return

sendFail = (res, err) =>
	res.json {
		success: false,
		message: err
	}
	return

isLoggedIn = isAuth(
	(req, res, next) =>
		next()
	,(req, res, err) =>
		sendFail res, err
)

#TODO: post:user must be auth free

router.get '/user', (req, res) =>
	repo.getAllUsers (err, users) =>
		if not err then sendSuccess res, users else sendFail res, err
	return

router.get '/user/:name', (req, res) =>
	repo.getUser req.params.name, (err, user) =>
		if not err then sendSuccess res, user else sendFail res, err
	return

router.post '/user', (req, res) =>
	if not req.body.name or not req.body.password
		sendFail res, 'invalid payload'
	else
		hashedPass = passwd.generate(req.body.password)
		newUser = {
			name: req.body.name,
			password: hashedPass,
			isAdmin: false,
			fullname: req.body.fullname,
			email: req.body.email
		}
		repo.addUser newUser, (err, user) =>
			if err sendFail then res, err else sendSuccess res, user: { name: user.name }
	return

#TODO: delete available only for admin, or self-delete
router.delete '/user/:name', (req, res) =>
	console.log req.params.name
	if not req.params.name
		sendFail res, 'no user name provided'
	else
		repo.deleteUser req.params.name, (err) =>
			if err then sendFail res, err else sendSuccess res, null
	return

module.exports = router
