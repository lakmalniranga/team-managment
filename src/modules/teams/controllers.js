import teamBusiness from '@teams/business';
import { OBJECT_NOT_FOUND } from '@src/helpers/errors';

export async function isExists(req) {
	const teamID = parseInt(req.params.teamID || req.body.teamID);
	if (!teamID) throw OBJECT_NOT_FOUND;

	const team = await teamBusiness.get({ teamID });
	if (!team) throw OBJECT_NOT_FOUND;

	return 'next';
}

export async function create(req, res) {
	const {
		body: { ...data },
		user: { userID },
	} = req;
	let team = await teamBusiness.create({ ...data, userID });
	res.json({ result: team });
}

export async function addUser(req, res) {
	const {
		body: { ...data },
		params: { teamID },
		user: { ...requestedUser },
	} = req;
	await teamBusiness.addUser({ requestedUser, teamID: parseInt(teamID), ...data });
	res.json({ result: 'success' });
}

export async function removeUser(req, res) {
	const {
		body: { ...data },
		params: { teamID },
		user: { ...requestedUser },
	} = req;
	await teamBusiness.removeUser({ requestedUser, teamID: parseInt(teamID), ...data });
	res.json({ result: 'success' });
}

export async function changeRole(req, res) {
	const {
		body: { ...data },
		params: { teamID },
		user: { ...requestedUser },
	} = req;
	await teamBusiness.changeRole({ requestedUser, teamID: parseInt(teamID), ...data });
	res.json({ result: 'success' });
}

export async function remove(req, res) {
	const {
		params: { teamID },
		user: { ...requestedUser },
	} = req;
	await teamBusiness.remove({ requestedUser, teamID: parseInt(teamID) });
	res.json({ result: 'success' });
}
