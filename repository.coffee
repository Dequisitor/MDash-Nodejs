mongojs = require 'mongojs'
config = require './config'

class Repository
	constructor: (connectionString) ->
		this.db = mongojs connectionString, ['users']
		return
	
	#check if user name is unique
	addUser: (newUser, callback) =>
		this.db.users.findOne {name: newUser.name} , (err, user) =>
			if not err
				if not user?
					this.db.users.insert newUser, (err, user) =>
						callback err, user
				else
					callback 'user name already taken', null
			else
				callback err, null
		return
	
	getUser: (name, callback) =>
		this.db.users.findOne {name: name}, (err, user) =>
			callback err, user
		return

	getAllUsers: (callback) =>
		this.db.users.find {}, {name: 1, isAdmin: 1, fullname: 1, email: 1}, (err, users) =>
			callback err, users
		return

	deleteUser: (name, callback) =>
		this.db.users.remove {name: name}, (err) =>
			callback err
		return

repo = new Repository(config.connectionString)
module.exports = repo
