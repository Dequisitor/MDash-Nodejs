mongojs = require 'mongojs'
config = require './config'

class Repository
	constructor: (connectionString) ->
		this.db = mongojs connectionString, ['users']
		return
	
	saveUser: (name, password, callback) =>
		this.db.users.insert {
			name: name,
			password: password,
			admin: false
		}, (err, user) =>
			if err
				throw err

			callback user
		return
	
	findUser: (name, callback) =>
		this.db.users.findOne {name: name}, (err, user) =>
			if err
				throw err

			callback user
		return

	getAllUsers: (callback) =>
		this.db.users.find {}, {name: 1}, (err, users) =>
			if err
				throw err

			callback users
		return

repo = new Repository(config.connectionString)
module.exports = repo
