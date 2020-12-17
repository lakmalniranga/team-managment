import joi from 'joi';

const passwordValidation = joi
	.string()
	.min(6)
	.required()
	.label('Choose a password 6 digits or longer');

const passwordForLoginValidation = joi.string().required();
const emailValidation = joi.string().email().required();
const phoneValidation = joi.string().regex(/.*/);

export const signupValidation = {
	firstName: joi.string().required(),
	lastName: joi.string().required(),
	phone: phoneValidation,
	email: emailValidation,
	password: passwordValidation,
	passwordConfirmation: joi
		.any()
		.required()
		.valid(joi.ref('password'))
		.label(`That's not quite right, can you try again?`),
};

export const loginValidation = {
	email: emailValidation,
	password: passwordForLoginValidation,
};

export const refreshTokenValidation = {
	refreshToken: joi.string().required(),
};

export const forgotPasswordValidation = {
	email: emailValidation,
};

export const resetPasswordValidation = {
	resetHash: joi.string().required(),
	password: passwordValidation,
	passwordConfirmation: joi
		.any()
		.required()
		.valid(joi.ref('password'))
		.label('Password Confirmation'),
};
