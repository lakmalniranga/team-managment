import HttpStatus from 'http-status-codes';

export const VALIDATION_ERROR = {
	statusCode: HttpStatus.BAD_REQUEST,
	message: 'Some data submitted are invalid',
	name: 'VALIDATION_ERROR',
};

export const EMAIL_INVALID = {
	statusCode: HttpStatus.BAD_REQUEST,
	message: 'Invalid Email',
	name: 'EMAIL_INVALID',
};

export const EMAIL_USED = {
	statusCode: HttpStatus.CONFLICT,
	message: 'You already created an account with that email. Try logging in?',
	name: 'EMAIL_USED',
};

export const ACCESS_UNAUTHORIZED = {
	statusCode: HttpStatus.UNAUTHORIZED,
	message: 'Unauthorized access',
	name: 'ACCESS_UNAUTHORIZED',
};

export const INVALID_PASSWORD = {
	statusCode: HttpStatus.UNAUTHORIZED,
	message: `That's not quite right, can you try again?`,
	name: 'INVALID_PASSWORD',
};

export const OBJECT_NOT_FOUND = {
	statusCode: HttpStatus.NOT_FOUND,
	message: 'Requested resource not found',
	name: 'OBJECT_NOT_FOUND',
};

export const USER_ALREADY_EXISTS_IN_TEAM = {
	statusCode: HttpStatus.NOT_FOUND,
	message: 'User already exists in the team',
	name: 'USER_ALREADY_EXISTS_IN_TEAM',
};

export const USER_DOES_NOT_EXISTS_IN_TEAM = {
	statusCode: HttpStatus.NOT_FOUND,
	message: 'User does not exists in the team',
	name: 'USER_DOES_NOT_EXISTS_IN_TEAM',
};

export const NOT_ALLOWED_YOURSELF_TO_REMOVE = {
	statusCode: HttpStatus.NOT_FOUND,
	message: 'You are not allowed to remove yourself from the team',
	name: 'NOT_ALLOWED_YOURSELF_TO_REMOVE',
};
