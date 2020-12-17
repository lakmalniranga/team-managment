import { crypto } from '@services';
import userRepo from '@users/repositories';
import { validateEmail } from '@src/helpers/generic';
import { EMAIL_INVALID, EMAIL_USED } from '@src/helpers/errors';

export class UserBusiness {
	get repo() {
		return userRepo;
	}

	async validateEmail({ email, excludeUserID }) {
		const isValid = await validateEmail(email);
		if (!isValid) throw EMAIL_INVALID;
		const exists = await userRepo.emailExists({ email, excludeUserID });
		if (exists) throw EMAIL_USED;
	}

	async createBasic({ email, password: inputPassword, ...rest }) {
		let password = null;
		if (inputPassword) password = await crypto.hash({ str: inputPassword });
		await this.validateEmail({ email });
		await this.repo.create({ email, password, ...rest });
		let user = await this.repo.findByEmail({ email });
		return user.toJSON();
	}
}
export default new UserBusiness();
