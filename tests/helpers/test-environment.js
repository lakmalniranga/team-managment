const NodeEnvironment = require('jest-environment-node');
// We cannot use paths here as this is not using module name mapper
const config = require('../../configurations');
const baseKnexConfig = require('../../knexfile');
const { databaseManagerFactory } = require('knex-db-manager');
const path = require('path');

class CustomEnvironment extends NodeEnvironment {
	constructor(config, context) {
		super(config, context);
		this.testPath = context.testPath;
		this.testDBName = `test__${path.basename(context.testPath)}_${Date.now()}_${parseInt(
			Math.random() * 10000
		)}`;
	}

	async setup() {
		try {
			const testKnexConfig = this.getKnexConfig({
				testDBName: this.testDBName,
			});
			const knexCleaner = databaseManagerFactory({
				knex: testKnexConfig,
				dbManager: {
					superUser: config.DATABASE.USER,
					superPassword: config.DATABASE.PASSWORD,
				},
			});
			this.knexCleaner = knexCleaner;
			this.global.Date.now = () => new Date('2019-12-01').getTime();
			this.global.knex = knexCleaner.knexInstance();
			this.global.testDBConfig = testKnexConfig.connection;
			this.global.testKnexConfig = testKnexConfig;
			await knexCleaner.createDb(this.testDBName);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async teardown() {
		try {
			await this.knexCleaner.closeKnex();
			await this.knexCleaner.dropDb(this.testDBName);
			await this.knexCleaner.close();
			await super.teardown();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	getKnexConfig({ testDBName }) {
		return {
			...baseKnexConfig,
			connection: {
				...baseKnexConfig.connection,
				database: testDBName,
			},
		};
	}

	getDBConfig({ testDBName }) {
		const dbConfig = {
			host: config.DATABASE.HOST,
			database: testDBName,
			port: config.DATABASE.PORT,
			user: config.DATABASE.USER,
			password: config.DATABASE.PASSWORD,
		};
		return dbConfig;
	}
}

module.exports = CustomEnvironment;
