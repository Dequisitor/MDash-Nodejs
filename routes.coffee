express = require 'express'
repo = require './Repository'
config = require './config'
jwt = require 'jsonwebtoken'
router = express.Router()

router.use (req, res, next) =>
	console.log 'entered middleware'
	token = req.body.token || req.headers.token

	if not token
		res.redirect '/login'
	else
		jwt.verify token, config.secret, (err, dtoken) =>
			if err
				res.status(403).json {
					success: false,
					message: 'invalid token'
				}
			else
				req.dtoken = dtoken
				next()
	return

router.get '/', (req, res) =>
	res.send 'home page'
	return

router.get '/users', (req, res) =>
	repo.getAllUsers (users) =>
		res.json users
	return

module.exports = router
