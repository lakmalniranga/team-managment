import bcrypt from 'bcryptjs';
import ServiceBase from './base';

class Crypto extends ServiceBase {
	async _initialize() {
		return bcrypt;
	}

	async hash({ str }) {
		return this.instance.hash(str, 10);
	}

	async verify({ hash, str }) {
		return this.instance.compare(str, hash);
	}
}

export default new Crypto();
