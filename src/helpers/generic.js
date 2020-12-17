import joi from 'joi';

import { add } from '@src/utils/date-time';
import { VALIDATION_ERROR } from '@src/helpers/errors';

export function generateExpiryDate({ hours }) {
	return add({ date: new Date(), duration: hours, durationType: 'hours' });
}

export function validateReq(dataKey, schema) {
	return function ValidateSchema(req) {
		const data = req[dataKey];
		const validator = joi.object({ ...schema });
		const isValid = validator.validate(data);
		if (isValid.error) throw { ...VALIDATION_ERROR, errors: isValid.error.details };
		return Promise.resolve('next');
	};
}

export async function validateEmail(email) {
	return /^.+?@.+[.]\w+$/.test(email);
}
