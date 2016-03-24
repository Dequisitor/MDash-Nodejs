import {Component} from 'angular2/core'
import {Router} from 'angular2/router'

class Login {
	public name: string,
	public password: string
}

@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})
export class LoginComponent {
	private _model: Login

	constructor(private _router: Router) {
		this._model = new Login()
	}

	public onSubmit($event) {
		console.log(this._model)
		$event.preventDefault()
	}
}
