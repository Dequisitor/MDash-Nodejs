import {Component, Input, OnInit} from 'angular2/core'
import {User} from '../services/user.service'

@Component({
	selector: 'input-user',
	templateUrl: 'input.component.html',
	inputs: ['user', 'index', 'current']
})
export class InputComponent {
	@Input() user: User
	@Input() index: number
	@Input() current: User;

	private editing: string;
	constructor() {
		this.editing = '';
	}

	public canDelete(user):boolean {
		if (this.current && (this.current.isAdmin || this.current.name == user.name)) {
			return true;
		} else {
			return false;
		}
	}

	public edit(control: string): string {
		if (!!control) {
			this.editing = control;
		}
		return this.editing;
	}
}
