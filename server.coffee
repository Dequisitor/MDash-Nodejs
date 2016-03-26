#third party dependecies
express = require 'express'
morgan = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'

#local dependencies
repo = require './DAL/repository'
config = require './config'
isAuth = require './Helpers/isAuth'
authRouter = require './Routers/auth.router'
apiRouter = require './Routers/api.router'

#config server
port = process.env.PORT || config.port
app = express()
app.use morgan('dev')
app.use cookieParser()
app.use bodyParser.json()
app.use bodyParser.urlencoded({extended: false})
app.use authRouter
app.use '/api', apiRouter

#static file routes
app.use express.static(__dirname+'/public')
app.use express.static(__dirname+'/public/dist')
app.use express.static(__dirname+'/public/node_modules')
app.use express.static(__dirname+'/public/views')

isAlreadyLoggedIn = isAuth(
	(req, res, next) => #already has valid token, redirect to home page
		res.redirect '/home'
	,(req, res, err) =>
		res.sendFile __dirname+'/public/views/_login.html'
)
app.get ['/', '/login', '/register'], isAlreadyLoggedIn

isAuthForHomePage = isAuth(
	(req, res, next) =>
		res.sendFile __dirname+'/public/views/_home.html'
	,(req, res, err) =>
		res.redirect('/') #not logged in, or invalid token, send back to login page
)
app.get ['/home', '/about', '/users'], isAuthForHomePage

app.listen port, () =>
	console.log 'webserver listening on port ', port
	return
