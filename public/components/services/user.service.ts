import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'

export class User {
	public name: string
	public isAdmin: boolean
	public fullname: string
	public email: string
}

@Injectable()
export class UserService {
	public users: User[]

	constructor(private _http: Http) {
	}

	private _respond(api, callback) {
		this._http.get(api)
			.map(res=> res.json())
			.subscribe(
				res => {
					if (res.success) {
						callback(null, res.result)
					} else {
						callback(res.message, null)
					}
				},
				error => {
					callback(error, null)
				}
			)
	}

	public getCurrentUser(callback) {
		this._respond('/api/current', callback)
	}

	public getUsers(callback) {
		this._respond('/api/user', callback)
	}
}
