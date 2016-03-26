express = require 'express'
router = express.Router()
repo = require './repository'
jwt = require 'jsonwebtoken'
config = require './config'
isAuth = require './isAuth'
passwd = require 'password-hash'

isAuthorizedForResource = isAuth(
	(req, res, next) =>
		res.json {
			success: true
		}
	,(req, res, err) =>
		res.json {
			success: false,
			message: err
		}
)
router.get '/isAuth', isAuthorizedForResource

router.post '/login', (req, res) =>
	repo.getUser req.body.name, (err, user) =>
		if err
			res.json {
				success: false,
				message: 'error finding user',
				error: err
			}
		else
			if not user
				res.json {
					success: false,
					message: 'unknown user'
				}
			else
				#if user.password != req.body.password
				if !passwd.verify(req.body.password, user.password)
					res.json {
						success: false,
						message: 'invalid password'
					}
				else
					token = jwt.sign(
						user,
						config.secret,
						{ expiresIn: 3600 }
					)
					res
						.cookie('token', token, { maxAge: 3600000 })
						.json {
							success: true,
							message: 'authenticated user'
						}
	return

router.get '/logout', (req, res) =>
	res.clearCookie('token').json {
		success: true,
		message: 'user logged out'
	}
	return

module.exports = router
