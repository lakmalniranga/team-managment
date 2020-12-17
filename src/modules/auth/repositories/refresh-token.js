import { db } from '@services';
import RefreshToken from '@src/dto/RefreshToken';

export const TABLE_NAME = 'RefreshTokens';

export class RefreshTokenRepository {
	findByIDQuery({ refreshTokenID }) {
		return db.knex(TABLE_NAME).select('*').where({ refreshTokenID });
	}

	async findByID({ refreshTokenID }) {
		const result = await this.findByIDQuery({ refreshTokenID });
		return RefreshToken.create(result[0]);
	}

	async findByToken({ token }) {
		const result = await db.knex(TABLE_NAME).select('*').where({ token });
		return RefreshToken.create(result[0]);
	}

	async deleteByToken({ token }) {
		const result = await db.knex(TABLE_NAME).delete().where({
			token,
		});
		return result;
	}

	async findByUser({ userID }) {
		const result = await db.knex(TABLE_NAME).select('*').where({ userID });
		return result.map((refreshTokenData) => RefreshToken.create(refreshTokenData));
	}

	async create({ userID, token, expiryDate }) {
		const result = await db.knex(TABLE_NAME).insert({
			userID,
			token,
			expiryDate: expiryDate,
		});
		return result;
	}
}

export default new RefreshTokenRepository();
