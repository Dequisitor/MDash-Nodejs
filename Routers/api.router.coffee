express = require 'express'
router = express.Router()
jwt = require 'jsonwebtoken'
passwd = require 'password-hash'

repo = require '../DAL/repository'
config = require '../config'
isAuth = require '../Helpers/isAuth'

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

router.get '/user', isLoggedIn, (req, res) =>
	repo.getAllUsers (err, users) =>
		if not err then sendSuccess res, users else sendFail res, err
	return

router.get '/user/:name', isLoggedIn, (req, res) =>
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
			if err then sendFail res, err else sendSuccess res, user: { name: user.name }
	return

router.delete '/user/:name', isLoggedIn, (req, res) =>
	username = req.params.name
	if not username
		sendFail res, 'no user name provided'
	else
		currentUser = req.dtoken #the decoded jwt is the current user
		if currentUser.isAdmin or currentUser.name == username
			repo.deleteUser username, (err) =>
				if err then sendFail res, err else sendSuccess res, null
		else
			sendFail res, 'not authorized to delete user'
	return

router.put '/user/:name', isLoggedIn, (req, res) =>
	username = req.params.name
	user = req.body.user
	if not username or not user
		sendFail res, 'no user provided'
	else
		currentUser = req.dtoken #the decoded jwt is the current user
		if not currentUser.isAdmin then user.isAdmin = false #don't allow user to set permissions without having admin rights
		if currentUser.isAdmin or currentUser.name == username
			repo.updateUser username, user, (err) => #username and user.name can be different if someone decided to change the login name of a user, username is the original
				if err then sendFail res, err else sendSuccess res, null
		else
			sendFail res, 'not authorized to change user\'s data'
	return



module.exports = router
