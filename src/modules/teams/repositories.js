import { db } from '@services';
import Team from '@src/dto/Team';
import { TEAM_ROLES } from '@src/constants/roles';

export const TABLE_NAME = 'Teams';
export const TEAM_USER_TABLE_NAME = 'TeamsUsers';

export class TeamRepository {
	dataClass() {
		return Team;
	}

	baseSelectQuery() {
		return db.knex(TABLE_NAME).select('*');
	}

	async findByIDQuery({ teamID }) {
		return this.baseSelectQuery().where({ teamID });
	}

	async findByID({ teamID }) {
		const result = await this.findByIDQuery({ teamID });
		return this.dataClass().create(result[0]);
	}

	async create({ userID, ...rest }) {
		const teamID = await db.knex.transaction(async (trx) => {
			let tempTeamID;
			tempTeamID = await trx(TABLE_NAME)
				.insert({ ...rest })
				.returning('teamID');
			await trx(TEAM_USER_TABLE_NAME).insert({
				userID,
				teamID: parseInt(tempTeamID),
				role: TEAM_ROLES.MANAGER,
			});
			return tempTeamID;
		});
		return parseInt(teamID);
	}

	async addUser({ userID, teamID, role }) {
		await db.knex(TEAM_USER_TABLE_NAME).insert({ userID, teamID, role });
	}

	async removeUser({ userID, teamID }) {
		await db.knex(TEAM_USER_TABLE_NAME).where({ userID, teamID }).del();
	}

	async isUserInTeam({ userID, ...rest }) {
		const result = await db.knex(TEAM_USER_TABLE_NAME).where({ userID, ...rest });
		return result[0];
	}

	async remove({ teamID }) {
		await db.knex.transaction(async (trx) => {
			await trx(TEAM_USER_TABLE_NAME).where({ teamID }).del();
			await trx(TABLE_NAME).where({ teamID }).del();
		});
	}

	async updateUserRole({ teamID, userID, role }) {
		await db.knex(TEAM_USER_TABLE_NAME).update({ role }).where({ teamID, userID });
	}
}

export default new TeamRepository();
