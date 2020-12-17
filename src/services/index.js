export { default as crypto } from './crypto';
export { default as db } from './db';
export { default as logger } from './logger';

import knexConfig from '@knexFile';

import crypto from './crypto';
import db from './db';
import logger from './logger';

export default async function initialize({ dbConfig, cryptoConfig }) {
	await crypto.initialize(cryptoConfig);
	await db.initialize(dbConfig || knexConfig.connection);
	await logger.initialize();
}
