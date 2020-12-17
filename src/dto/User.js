import BaseModel from './Base';

export default class User extends BaseModel {
	/**
	 *
	 * @param data {import('./User').User}
	 */
	constructor(data) {
		super(data);
	}

	toJSON() {
		const temp = { ...this };
		delete temp.password;
		return temp;
	}

	toJSONAdmin() {
		const temp = { ...this };
		delete temp.password;
		return temp;
	}
}
