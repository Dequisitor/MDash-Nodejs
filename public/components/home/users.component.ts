import {Component} from 'angular2/core'
import {Http} from 'angular2/http'
import {User, UserService} from '../services/user.service'
import 'rxjs/Rx' //.map stuff

@Component({
	selector: 'users',
	templateUrl: 'users.component.html',
	providers: [UserService]
})
export class UsersComponent {
	public users: User[]
	public message: string

	constructor(private _userService: UserService) {
		this._userService.getUsers((err, users) => {
			if (!err) {
				this.users = users
			} else {
				this.message = err
			}
		})
	}
}
