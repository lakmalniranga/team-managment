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

// export const CURRENT_PASSWORD_INVALID = {
// 	statusCode: HttpStatus.BAD_REQUEST,
// 	message: 'Current password provided is wrong',
// 	name: 'CURRENT_PASSWORD_INVALID',
// };

// export const OBJECT_NOT_FOUND = {
// 	statusCode: HttpStatus.NOT_FOUND,
// 	message: 'Requested resource not found',
// 	name: 'OBJECT_NOT_FOUND',
// };
