import BaseModel from './Base';

export default class User extends BaseModel {
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
