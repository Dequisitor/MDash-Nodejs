import {Component} from 'angular2/core'
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http'
import {Router, Location, RouteParams} from 'angular2/router'
import {CookieService} from 'angular2-cookie/core'
import 'rxjs/Rx' //needed for .map

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
	public name: string

	constructor(
		private _router: Router,
		private _routeParams: RouteParams,
		private _http: Http,
		private _cookieService: CookieService,
		private _location: Location) {
		this._model = new Login()
		this.name = this._routeParams.get('name')

		if (this.name) {
			this._model.name = this.name
		}
	}

	public onSubmit($event) {
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
						window.location.href='/home'
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
