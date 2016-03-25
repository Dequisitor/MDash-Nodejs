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

	public getUsers(callback) {
		this._http.get('/api/user')
			.map(res => res.json())
			.subscribe(
				res => {
					if (res.success) {
						this.users = res.result
						callback(null, this.users)
					} else {
						callback(res.message, null)
					}
				},
				error => {
					callback(error, null)
				}
			)
	}
}
