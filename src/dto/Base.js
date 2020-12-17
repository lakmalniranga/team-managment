export default class BaseModel {
	constructor(data) {
		Object.assign(this, data);
	}

	static create(data) {
		return data ? new this(data) : null;
	}

	toJSON() {
		return { ...this };
	}

	toJSONAdmin() {
		return { ...this };
	}
}
