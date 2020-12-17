import http from 'http';

import app from '@app';
import config from '@config';
import { logger } from '@services';

/**
 * Get port from environment and store in Express.
 */
const port = config.PORT;
app.set('port', 3000);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	// handle specific listen errors
	switch (error.code) {
		case 'EACCES':
			logger.error(port + ' requires elevated privileges');
			process.exit(1); // eslint-disable-line no-process-exit
			break;
		case 'EADDRINUSE':
			logger.error(port + ' is already in use');
			process.exit(1); // eslint-disable-line no-process-exit
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	logger.log(`Running in ${config.ENVIRONMENT} mode on :${port}`);
}
