express = require 'express'
morgan = require 'morgan'
bodyParser = require 'body-parser'
jwt = require 'jsonwebtoken'
config = require './config'
router = require './routes'
repo = require './Repository'

port = process.env.PORT || config.port

app = express()
app.use morgan('dev')
app.use bodyParser.json()
app.use bodyParser.urlencoded({extended: false})

app.use express.static(__dirname+'/public')
#app.use express.static(__dirname+'/public/views')
app.use '/home', router

app.get '/', (req, res) =>
	res.redirect '/home'
	return

app.get '/register', (req, res) =>
	#res.sendFile 'register.html'
	res.send 'register page'
	return

app.post '/register', (req, res) =>
	repo.saveUser req.body.name, req.body.password, (user) =>
		res.json {
			success: true,
			message: 'user registered',
			user: user
		}
	return

app.get '/login', (req, res) =>
	res.sendFile 'public/views/login.html', {root: __dirname}
	return

app.post '/login', (req, res) =>
	console.log req.body.name, ' ', req.body.password
	repo.findUser req.body.name, (user) =>
		if not user
			res.json {
				success: false,
				message: 'unknown user'
			}
		else
			if user.password != req.body.password
				res.json {
					success: false,
					message: 'invalid password'
				}
			else
				token = jwt.sign(
					user,
					config.secret,
					{ expiresInMinutes: 60 }
				)
				res.json {
					success: true,
					message: 'authenticated user',
					token: token
				}
	return

app.listen port, () =>
	console.log 'webserver listening on port ', port
	return
