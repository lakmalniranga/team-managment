// NO ES6 HERE as it's used by several binaries not using babel
const path = require('path');
const dotenv = require('dotenv');

// parse enviroment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), './.env') });

const environment = process.env.NODE_ENV || 'development';

module.exports = {
	ENVIRONMENT: environment,
	IS_PRODUCTION: environment === 'production',
	IS_STAGING: environment === 'staging',
	IS_DEVELOPMENT: environment === 'development',
	IS_TEST: environment === 'test',
	PORT: parseInt(process.env.PORT) || 3333,
};
