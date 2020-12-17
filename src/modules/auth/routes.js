import promiseRouter from 'express-promise-router';

import {
	signup,
	login,
	logout,
	refreshToken,
	forgotPassword,
	resetPassword,
	isAuthenticated,
} from '@auth/controllers';
import {
	signupValidation,
	loginValidation,
	refreshTokenValidation,
	forgotPasswordValidation,
	resetPasswordValidation,
} from '@auth/validation-schema';

import { validateReq } from '@src/helpers/generic';

const router = promiseRouter();

router.post('/signup', validateReq('body', signupValidation), signup);
router.post('/login', validateReq('body', loginValidation), login);
router.post('/token', validateReq('body', refreshTokenValidation), refreshToken);
router.post('/password/forgot', validateReq('body', forgotPasswordValidation), forgotPassword);
router.post('/password/reset', validateReq('body', resetPasswordValidation), resetPassword);
router.post('/logout', isAuthenticated, logout);

export default router;
