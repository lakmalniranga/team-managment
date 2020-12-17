import express from 'express';
import requestLogger from 'morgan';
import cors from 'cors';

import { logger } from '@services';

const app = express();

/**
 * Middleware configuration for express
 */
app.use(requestLogger('tiny'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cors());

/**
 * Return errors with relevent HTTP status code
 */
app.use(function (error, req, res, next) {
	if (!res.headersSent && error.statusCode) {
		res.status(error.statusCode).send({
			error: error,
		});
	} else {
		next(error);
	}
});

/**
 * Event listener for unhandled exception.
 */
process.on('unhandledRejection', (error, promise) => {
	logger.error('🔥 -> Promise rejection here: ', promise);
	logger.error('🐞 -> The error was: ', error);
});

process.on('uncaughtException', (error) => {
	logger.error('🔥 -> Something terrible happened: ', error);
	logger.error('🐞 -> The error was: ', error);
	process.exit(1);
});

export default app;
