express = require 'express'
morgan = require 'morgan'
bodyParser = require 'body-parser'
jwt = require 'jsonwebtoken'
config = require './config'
isAuth = require './restricted.router'
#authRouter = require './auth.router'
repo = require './repository'

port = process.env.PORT || config.port

app = express()
app.use morgan('dev')
app.use bodyParser.json()
app.use bodyParser.urlencoded({extended: false})

#check if user has permissions
app.get '/home.component.html', isAuth
app.get '/users.component.html', isAuth
app.get '/about.component.html', isAuth

#static file routes
app.use express.static(__dirname+'/public')
app.use express.static(__dirname+'/public/node_modules')
app.use express.static(__dirname+'/public/views')

app.post '/register', (req, res) =>
	repo.saveUser req.body.name, req.body.password, (err, user) =>
		if err
			res.json {
				success: false,
				message: 'error registering user',
				error: err
			}
		else
			res.json {
				success: true,
				message: 'user registered',
				user: user
			}
	return

app.post '/login', (req, res) =>
	console.log req.body.name, ' ', req.body.password
	repo.findUser req.body.name, (err, user) =>
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
				#hash compare
				if user.password != req.body.password
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
					res.cookie('token', token, { expires: new Date(Date.now + 3600) }).json {
						success: true,
						message: 'authenticated user'
					}
	return

app.get '/logout', (req, res) =>
	res.clearCookie('token').json {
		success: true,
		message: 'user logged out'
	}
	return

app.get '/*', (req, res) =>
	res.sendFile __dirname+'/public/views/_layout.html'
	return

app.listen port, () =>
	console.log 'webserver listening on port ', port
	return
