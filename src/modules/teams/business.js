import teamRepo from '@teams/repositories';
import { TEAM_ROLES } from '@src/constants/roles';
import {
	ACCESS_UNAUTHORIZED,
	USER_DOES_NOT_EXISTS_IN_TEAM,
	USER_ALREADY_EXISTS_IN_TEAM,
	NOT_ALLOWED_YOURSELF_TO_REMOVE,
} from '@src/helpers/errors';

export class UserBusiness {
	get repo() {
		return teamRepo;
	}

	async get({ teamID }) {
		const team = await this.repo.findByID({ teamID });
		return team.toJSON();
	}

	async isUserAuthorized({ userID, teamID, role }) {
		let isExists = true;
		const result = await this.repo.isUserInTeam({ userID, teamID, role });
		if (!result || result.role !== role) isExists = false;
		return isExists;
	}

	async isUserAlreadyInTeam({ userID, teamID }) {
		let isExists = true;
		const result = await this.repo.isUserInTeam({ userID, teamID });
		if (!result) isExists = false;
		return isExists;
	}

	async create({ name, userID }) {
		const teamID = await this.repo.create({ name, userID });
		const team = await this.repo.findByID({ teamID });
		return team.toJSON();
	}

	async remove({ requestedUser, teamID }) {
		// Only manager can drop team
		const isAuthorized = await this.isUserAuthorized({
			userID: requestedUser.userID,
			teamID,
			role: TEAM_ROLES.MANAGER,
		});
		if (!isAuthorized) throw ACCESS_UNAUTHORIZED;

		await this.repo.remove({ teamID });
	}

	async addUser({ requestedUser, userID, teamID, role }) {
		// Only manager can add users
		const isAuthorized = await this.isUserAuthorized({
			userID: requestedUser.userID,
			teamID,
			role: TEAM_ROLES.MANAGER,
		});
		if (!isAuthorized) throw ACCESS_UNAUTHORIZED;

		// Can't add existing users again
		const isExistsInTeam = await this.isUserAlreadyInTeam({ userID, teamID });
		if (isExistsInTeam) throw USER_ALREADY_EXISTS_IN_TEAM;

		await this.repo.addUser({ userID, teamID, role });
	}

	async removeUser({ requestedUser, userID, teamID }) {
		// Only manager can remove users
		const isAuthorized = await this.isUserAuthorized({
			userID: requestedUser.userID,
			teamID,
			role: TEAM_ROLES.MANAGER,
		});
		if (!isAuthorized) throw ACCESS_UNAUTHORIZED;

		// Can't remove non existing users
		const isExistsInTeam = await this.isUserAlreadyInTeam({ userID, teamID });
		if (!isExistsInTeam) throw USER_DOES_NOT_EXISTS_IN_TEAM;

		// Manager can't remove own account from team
		if (requestedUser.userID === userID) throw NOT_ALLOWED_YOURSELF_TO_REMOVE;

		await this.repo.removeUser({ userID, teamID });
	}

	async changeRole({ requestedUser, teamID, userID, role }) {
		// Only manager can change user status
		const isAuthorized = await this.isUserAuthorized({
			userID: requestedUser.userID,
			teamID,
			role: TEAM_ROLES.MANAGER,
		});
		if (!isAuthorized) throw ACCESS_UNAUTHORIZED;

		// Can't update status of non existing users
		const isExistsInTeam = await this.isUserAlreadyInTeam({ userID, teamID });
		if (!isExistsInTeam) throw USER_DOES_NOT_EXISTS_IN_TEAM;

		// Manager can't change role in own account
		if (requestedUser.userID === userID) throw NOT_ALLOWED_YOURSELF_TO_REMOVE;

		await this.repo.updateUserRole({ userID, teamID, role });
	}
}
export default new UserBusiness();
