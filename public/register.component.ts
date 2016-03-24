import {Component} from 'angular2/core'
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http'
import {Router} from 'angular2/router'
import 'rxjs/Rx'

class Login {
	public name: string
	public password: string
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
		console.log(this._model)
		$event.preventDefault()

		var body = "name="+this._model.name+"&password="+this._model.password
		var headers = new Headers()
		headers.append('Content-Type', 'application/x-www-form-urlencoded')

		this._http.post('/register', body, { headers: headers })
			.map(res => res.json())
			.subscribe(
				res => {
					console.log(res)
					this._router.navigate(['Login'])
				},
				error => {
					console.log(error)
					this.message = error
				}
			)
	}
}
