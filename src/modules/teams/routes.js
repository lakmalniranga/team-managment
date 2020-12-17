import promiseRouter from 'express-promise-router';

import { create, remove, addUser, removeUser, changeRole } from '@teams/controllers';
import {
	createValidation,
	addUserValidation,
	changeRoleValidation,
	removeUserValidation,
} from '@teams/validation-schema';

import { validateReq } from '@src/helpers/generic';

const router = promiseRouter();

router.post('/', validateReq('body', createValidation), create);
router.post('/:teamID([0-9]+)/add-user', validateReq('body', addUserValidation), addUser);
router.post('/:teamID([0-9]+)/remove-user', validateReq('body', removeUserValidation), removeUser);
router.patch('/:teamID([0-9]+)/change-role', validateReq('body', changeRoleValidation), changeRole);
router.delete('/:teamID([0-9]+)', remove);

export default router;
