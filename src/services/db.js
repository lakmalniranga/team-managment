/** @typedef { import('knex') } Knex */
import knexFactory from 'knex';
import knexConfig from '@knexFile';
import config from '@config';
import ServiceBase from './base';

const DEBUG_KNEX = process.env.DEBUG_KNEX?.toLowerCase() === 'true';

class DB extends ServiceBase {
	/**
	 * @type {knexFactory}
	 */
	get knex() {
		return this.instance;
	}
	async _initialize(connectionDetails) {
		const dbConfig = connectionDetails;
		if (config.IS_DEVELOPMENT) {
			console.log(connectionDetails);
		}
		const knex = knexFactory({
			...knexConfig,
			connection: { ...dbConfig },
		});
		if (DEBUG_KNEX && config.IS_DEVELOPMENT) {
			knex.on('query', (data) => console.log('===>', data.sql, data.bindings));
		}
		return knex;
	}
	async _destroy() {
		await this.instance.destroy();
	}
}

export default new DB();
