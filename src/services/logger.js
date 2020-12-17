/* eslint-disable no-console */
import ServiceBase from './base';

// TODO: Integrate a logger and remove console logs.
class Logger extends ServiceBase {
	async _initialize() {
		return true;
	}
	debug(...params) {
		console.log(...params);
	}
	log(...params) {
		console.log(...params);
	}
	error(...params) {
		console.error(...params);
	}
}

export default new Logger();
