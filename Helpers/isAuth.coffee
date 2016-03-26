jwt = require 'jsonwebtoken'

config = require '../config'

isAuth = (success, failure) =>
	return (req, res, next) =>
			token = req.cookies?.token
			if not token
				failure req, res, 'no token present'
			else
				jwt.verify token, config.secret, (err, dtoken) =>
					if err
						failure req, res, 'invalid token'
					else
						req.dtoken = dtoken
						success req, res, next
	
module.exports = isAuth
