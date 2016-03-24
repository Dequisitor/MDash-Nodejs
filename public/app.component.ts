import {Component} from 'angular2/core'
import {RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {CookieService} from 'angular2-cookie/core'

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
	private message: string

	constructor(private _router: Router, private _cookieService: CookieService) {
	}

	public changeRoute(route: string) {
		let token = this._cookieService.get('token')
		console.log('token: ',token)
		if (token) {
			console.log('changing route to ', route)
			//this._router.navigate([route])
		} else {
			console.log('rerouting to login')
			this.message = "Unauthorized"
			this._router.navigate(['Login'])
		}
	}
}
