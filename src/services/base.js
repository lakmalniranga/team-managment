export default class ServiceBase {
	get isInitialized() {
		return Object.prototype.hasOwnProperty.call(this, '_isInitialized')
			? this._isInitialized
			: false;
	}
	set isInitialized(val) {
		this._isInitialized = val;
	}

	get instance() {
		if (Object.prototype.hasOwnProperty.call(this, '_instance')) {
			return this._instance;
		}
		if (this.isInitialized) {
			throw Error(
				`"Initialize" method was called but "${this.name}" Service was not initialized properly`
			);
		} else {
			throw Error(
				`"${this.name}" Service is not yet initialized. Call "initialize" method first.`
			);
		}
	}
	set instance(val) {
		this._instance = val;
	}

	async _initialize() {
		throw Error(`Not defined in ${this.name}`);
	}

	async initialize(config) {
		if (this.isInitialized) {
			return;
		}
		this.isInitialized = true;
		this.instance = await this._initialize(config);
	}

	async _destroy() {
		throw Error(`Not defined in ${this.name}`);
	}

	async destroy() {
		await this._destroy();
	}
}
