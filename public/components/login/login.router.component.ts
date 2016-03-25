import {Component} from 'angular2/core'
import {RouteConfig, Router, Location, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {CookieService} from 'angular2-cookie/core'

import {LoginComponent} from './login.component'
import {RegisterComponent} from './register.component'

@Component({
	selector: 'login-main',
	templateUrl: 'login.router.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, CookieService] //can be removed
})
@RouteConfig([
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent,
		useAsDefault: true
	},
	{
		path: '/register',
		name: 'Register',
		component: RegisterComponent
	}
])
export class LoginRouterComponent {
	constructor(private _location: Location) {
	}

	public currentPageIsLogin(): boolean {
		return (this._location.path() != '/register')
	}
}
