import BaseModel from './Base';

export default class Teams extends BaseModel {
	constructor(data) {
		super(data);
	}

	toJSON() {
		const temp = { ...this };
		return temp;
	}
}
