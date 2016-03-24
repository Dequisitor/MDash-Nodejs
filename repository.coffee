mongojs = require 'mongojs'
config = require './config'

class Repository
	constructor: (connectionString) ->
		this.db = mongojs connectionString, ['users']
		return
	
	saveUser: (name, password, callback) =>
		#hash password
		this.db.users.insert {
			name: name,
			password: password,
			admin: false
		}, (err, user) =>
			callback err, user
		return
	
	findUser: (name, callback) =>
		this.db.users.findOne {name: name}, (err, user) =>
			callback err, user
		return

	getAllUsers: (callback) =>
		this.db.users.find {}, {name: 1}, (err, users) =>
			callback err, users
		return

repo = new Repository(config.connectionString)
module.exports = repo
