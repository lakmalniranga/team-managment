import joi from 'joi';

import { TEAM_ROLES } from '@src/constants/roles';

export const createValidation = {
	name: joi.string().required(),
};

export const addUserValidation = {
	userID: joi.number().required(),
	role: joi
		.string()
		.required()
		.valid(...Object.values(TEAM_ROLES)),
};

export const removeUserValidation = {
	userID: joi.number().required(),
};

export const changeRoleValidation = {
	userID: joi.number().required(),
	role: joi
		.string()
		.required()
		.valid(...Object.values(TEAM_ROLES)),
};
