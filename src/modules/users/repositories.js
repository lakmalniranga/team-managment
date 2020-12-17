import { db } from '@services';
import User from '@src/dto/User';

export const TABLE_NAME = 'Users';

export class UserRepository {
	dataClass() {
		return User;
	}

	baseSelectQuery() {
		return db.knex(TABLE_NAME).select('*');
	}

	findByIDQuery({ userID }) {
		return this.baseSelectQuery().where({ userID });
	}

	findByEmailQuery({ email }) {
		return this.baseSelectQuery().where({ email });
	}

	async findAll() {
		const result = await this.baseSelectQuery();
		return result.map((user) => User.create(user));
	}

	async emailExists({ email, excludeUserID }) {
		let query = this.baseSelectQuery().where({ email });
		if (excludeUserID) query = query.andWhereNot({ userID: excludeUserID });
		const result = await query;
		return this.dataClass().create(result[0]);
	}

	async findByResetPasswordHash({ resetPasswordHash }) {
		const result = await this.baseSelectQuery().where({ resetPasswordHash });
		return this.dataClass().create(result[0]);
	}

	async findByID({ userID }) {
		const result = await this.findByIDQuery({ userID });
		return this.dataClass().create(result[0]);
	}

	async findByEmail({ email }) {
		const result = await this.findByEmailQuery({ email });
		return this.dataClass().create(result[0]);
	}

	async findByToken({ token }) {
		const result = await db
			.knex(TABLE_NAME)
			.select('Users.*')
			.join('RefreshTokens', 'Users.userID', '=', 'RefreshTokens.userID')
			.where({ token });
		return this.dataClass().create(result[0]);
	}

	async create({ ...data }) {
		const userIDStr = await db
			.knex(TABLE_NAME)
			.insert({ ...data })
			.into(TABLE_NAME)
			.returning('userID');
		return parseInt(userIDStr);
	}

	async updateLastLogin({ userID, lastLoggedAt }) {
		let rowsAffected = await db.knex(TABLE_NAME).update({ lastLoggedAt }).where({ userID });
		return rowsAffected;
	}
}

export default new UserRepository();
