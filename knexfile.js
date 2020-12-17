const { DATABASE } = require('./configurations');
module.exports = {
	client: 'pg',
	pool: {
		min: 5,
		max: 20,
		idleTimeoutMillis: 500,
	},
	migrations: {
		tableName: 'migrations',
	},
	connection: {
		host: DATABASE.HOST,
		port: DATABASE.PORT,
		database: DATABASE.NAME,
		user: DATABASE.USER,
		password: DATABASE.PASSWORD,
	},
};
