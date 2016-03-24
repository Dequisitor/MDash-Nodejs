import {Component} from 'angular2/core'
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {CookieService} from 'angular2-cookie/core'
import {Http} from 'angular2/http'

import {HomeComponent} from './home.component'
import {UsersComponent} from './users.component'
import {AboutComponent} from './about.component'
import {LoginComponent} from './login.component'
import {RegisterComponent} from './register.component'

@Component({
	selector: 'app-main',
	templateUrl: 'app.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, CookieService]
})
@RouteConfig([
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent
	},
	{
		path: '/users',
		name: 'Users',
		component: UsersComponent
	},
	{
		path: '/about',
		name: 'About',
		component: AboutComponent
	},
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
export class AppComponent {
	public message: string
	private _token: string

	constructor(private _router: Router, private _cookieService: CookieService, private _http: Http) {
		this._token = this._cookieService.get('token')

		console.log('inside app constructor')
		if (!this._token && (this._router.lastNavigationAttempt != 'Register')) {
			console.log('navigate to login')
			this._router.navigate(['Login'])
		}
	}

	public changeRoute(route: string) {
		this._token = this._cookieService.get('token')
		if (this._token) {
			console.log('changing route to ', route)
			this._http.get('/isAuth')
				.map(res => res.json())
				.subscribe(
					res => {
						if (res.success) {
							this._router.navigate([route])
						} else {
							this.message = res.message
							this._cookieService.remove('token')
						}
					},
					error => {
						console.log(error)
						this.message = error
					}
				)
		} else {
			console.log('rerouting to login')
			this.message = "Unauthorized"
			this._router.navigate(['Login'])
		}
	}

	public logoutUser() {
		this._cookieService.remove('token')
		this._router.navigate(['Login'])
	}
}
