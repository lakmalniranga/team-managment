import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';

import config from '@config';
import authBusiness from '@auth/business';
import userBusiness from '@users/business';
import { parse, isBefore } from '@src/utils/date-time';
import { generateExpiryDate } from '@src/helpers/generic';
import { ACCESS_UNAUTHORIZED } from '@src/helpers/errors';
import { getUserRepo, getUserBusiness } from '@src/helpers/user';

export async function signup(req, res) {
	const data = req.body;
	delete data.passwordConfirmation;
	let user = await userBusiness.createBasic({ ...data });
	let tokens = await authBusiness.generateTokens({ user });
	res.json({ result: { user, ...tokens } });
}

export async function login(req, res) {
	const { email, password } = req.body;
	const { authToken, refreshToken } = await authBusiness.login({ email, password });
	res.json({ result: { authToken, refreshToken } });
}

export async function logout(req, res) {
	const refreshToken = req.body.refreshToken;
	await authBusiness.logout({ refreshToken });
	res.json({ result: { message: 'Success' } });
}

export async function refreshToken(req, res) {
	const refreshToken = req.body.refreshToken;
	const authToken = extractAuthToken({ req });
	const newAuthToken = await authBusiness.refreshToken({ refreshToken, authToken });
	res.json({ result: newAuthToken });
}

export async function forgotPassword(req, res) {
	await authBusiness.forgotPassword({ ...req.body });
	res.json({ result: { message: 'Success' } });
}

export async function resetPassword(req, res) {
	await authBusiness.resetPassword({ ...req.body });
	res.json({ result: { message: 'Success' } });
}

export function generateToken({ payload }) {
	const expiry = generateExpiryDate({ hours: 1 });
	return jwt.sign({ ...payload, expiry: expiry }, config.APP_SECRET);
}

export function decodeToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, config.APP_SECRET, (error, payload) => {
			if (error) {
				reject(ACCESS_UNAUTHORIZED);
			} else {
				resolve(payload);
			}
		});
	});
}

export function extractAuthToken({ req }) {
	const token = req.headers.authorization?.split(/\s+/)[1];
	if (!token) throw ACCESS_UNAUTHORIZED;
	return token;
}

export async function generateRandomToken() {
	return uuidV4();
}

export async function isAuthenticated(req, res, next) {
	try {
		const token = extractAuthToken({ req });
		const { userID, expiry } = await decodeToken(token);
		if (isBefore(parse(expiry), new Date())) throw ACCESS_UNAUTHORIZED;
		const repo = getUserRepo();
		const user = await repo.findByID({ userID });
		if (!user) throw ACCESS_UNAUTHORIZED;

		req.user = user;
		req.userRepo = repo;
		req.userBusiness = getUserBusiness();
	} catch (e) {
		return next(e);
	}
	next();
}
