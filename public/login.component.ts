import {Component} from 'angular2/core'
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http'
import {Router} from 'angular2/router'
import {CookieService} from 'angular2-cookie/core'
import 'rxjs/Rx'

class Login {
	public name: string
	public password: string
}

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	providers: [HTTP_BINDINGS, CookieService]
})
export class LoginComponent {
	private _model: Login
	public message: string

	constructor(private _router: Router, private _http: Http, private _cookieService: CookieService) {
		this._model = new Login()

		if (this._cookieService.get('token'))
			this._router.navigate(['Home'])
	}

	public onSubmit($event) {
		console.log(this._model)
		$event.preventDefault()

		var body = "name="+this._model.name+"&password="+this._model.password
		var headers = new Headers()
		headers.append('Content-Type', 'application/x-www-form-urlencoded')

		this._http.post('/login', body, { headers: headers })
			.map(res => res.json())
			.subscribe(
				res => {
					console.log(res)
					if (res.success) {
						this._router.navigate(['Home'])
					} else {
						this.message = res.message
					}
				},
				error => {
					console.log(error)
					this.message = error
				}
			)

	}
}
