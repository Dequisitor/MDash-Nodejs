isAuth = (req, res, next) =>
	token = req.body?.token || req.headers?.token || req.cookies?.token

	if not token
		res.status(403).json {
			success: false,
			message: 'no token present'
		}
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

module.exports = isAuth
