import {Component} from 'angular2/core'
import {RouteConfig, Router, Location, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'
import {CookieService} from 'angular2-cookie/core'
import {Http} from 'angular2/http'
import 'rxjs/Rx' //needed for .map

import {HomeComponent} from './home.component'
import {UsersComponent} from './users.component'
import {AboutComponent} from './about.component'

@Component({
	selector: 'home-main',
	templateUrl: 'home.router.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, CookieService]
})
@RouteConfig([
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
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
	}
])
export class HomeRouterComponent {
	public message: string
	public username: string

	constructor(private _router: Router,
				private _cookieService: CookieService,
				private _http: Http,
				private _location: Location) {
		this.username = 'None'
	}

	public changeRoute(route: string) {
		let token = this._cookieService.get('token')
		if (token) {
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
			window.location.href = '/login'
		}
	}

	public logoutUser() {
		this._cookieService.remove('token')
		window.location.href = '/login'
	}

	public isActiveRoute(route: string): boolean {
		let path = this._location.path()
		if (path == '/'+route) {
			return true
		} else {
			return false
		}
	}
}
