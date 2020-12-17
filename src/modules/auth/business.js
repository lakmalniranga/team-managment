import { crypto } from '@services';
import userRepo from '@users/repositories';
import { generateExpiryDate } from '@src/helpers/generic';
import refreshTokenRepo from '@auth/repositories/refresh-token';
import { isBefore, currentDateTime } from '@src/utils/date-time';
import { ACCESS_UNAUTHORIZED, INVALID_PASSWORD } from '@src/helpers/errors';
import { generateToken, generateRandomToken, decodeToken } from '@auth/controllers';

class AuthBusiness {
	async login({ email, password }) {
		const user = await userRepo.findByEmail({ email });
		if (!user) throw ACCESS_UNAUTHORIZED;

		const isValid = await crypto.verify({
			hash: user.password,
			str: password,
		});
		if (!isValid) throw INVALID_PASSWORD;

		const lastLoggedAt = currentDateTime();
		await userRepo.updateLastLogin({ userID: user.userID, lastLoggedAt });
		const tokens = await this.generateTokens({ user });
		return tokens;
	}

	async generateTokens({ user }) {
		const refreshToken = await generateRandomToken();
		await refreshTokenRepo.create({
			userID: user.userID,
			token: refreshToken,
			expiryDate: generateExpiryDate({ hours: 750 }),
		});
		const authToken = generateToken({
			payload: { userID: user.userID, role: user.role },
		});
		return { authToken, refreshToken };
	}

	async logout({ refreshToken }) {
		return refreshTokenRepo.deleteByToken({ token: refreshToken });
	}

	async refreshToken({ refreshToken, authToken }) {
		const { userID } = await decodeToken(authToken);
		const refreshTokenObj = await refreshTokenRepo.findByToken({ token: refreshToken });
		if (userID !== refreshTokenObj?.userID) throw ACCESS_UNAUTHORIZED;
		return generateToken({ payload: { userID } });
	}

	async forgotPassword({ email: to }) {
		const email = to.toLowerCase();
		const user = await userRepo.emailExists({ email });
		if (!user) return false;

		const resetHash = await generateRandomToken();
		const expiry = generateExpiryDate({ hours: 24 });
		await userRepo.resetPassword({ userID: user.userID, resetHash, expiry });
		// TODO: trigger email to user
	}

	async resetPassword({ resetHash, password }) {
		const user = await userRepo.findByResetPasswordHash({ resetPasswordHash: resetHash });
		if (!user) throw ACCESS_UNAUTHORIZED;

		if (!isBefore(new Date(), new Date(user.resetPasswordHashExpiry)))
			throw ACCESS_UNAUTHORIZED;
		const hashedPassword = await crypto.hash({ str: password });
		await userRepo.updatePassword({
			userID: user.userID,
			password: hashedPassword,
		});
	}
}
export default new AuthBusiness();
