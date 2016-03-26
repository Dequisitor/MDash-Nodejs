import {Component, OnInit} from 'angular2/core'
import {Http} from 'angular2/http'
import {User, UserService} from '../services/user.service'
import 'rxjs/Rx' //.map stuff

@Component({
	selector: 'users',
	templateUrl: 'users.component.html',
	providers: [UserService]
})
export class UsersComponent implements OnInit{
	public users: User[]
	public currentUser: User
	public message: string

	ngOnInit() {
		this._userService.getUsers((err, users) => {
			if (!err) {
				this.users = users
			} else {
				this.message = err
			}
		})

		this._userService.getCurrentUser((err, user) => {
			if (!err) {
				this.currentUser = user
			} else {
				this.message = err
			}
		})
	}

	constructor(private _userService: UserService) {
	}
}
