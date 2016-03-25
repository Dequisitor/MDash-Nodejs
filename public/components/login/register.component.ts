import {Component} from 'angular2/core'
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http'
import {Router} from 'angular2/router'
import 'rxjs/Rx'

class Login {
	public name: string
	public password: string
	public isAdmin: boolean
	public fullname: string
	public email: string
}

@Component({
	selector: 'register',
	templateUrl: 'register.component.html',
	providers: [HTTP_BINDINGS]
})
export class RegisterComponent {
	private _model: Login
	public message: string

	constructor(private _router: Router, private _http: Http) {
		this._model = new Login()
	}

	public onSubmit($event) {
		$event.preventDefault()

		this._model.isAdmin = false
		let body = JSON.stringify(this._model)
		let headers = new Headers()
		headers.append('Content-Type', 'application/json')

		this._http.post('/api/user', body, { headers: headers })
			.map(res => res.json())
			.subscribe(
				res => {
					if (res.success) {
						console.log(res)
						this._router.navigate(['Login', { name: res.result.user.name }])
					} else {
						this.message = res.message
					}
				},
				error => {
					this.message = error
				}
			)
	}
}
