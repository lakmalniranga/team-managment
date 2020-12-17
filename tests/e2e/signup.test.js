import HttpStatus from 'http-status-codes';
import superTest from 'supertest';

import app from '@src/app';
import { seed } from '@tests/seeds/signup';
import { EMAIL_USED } from '@src/helpers/errors';
import servicesInitializer, { db } from '@services';

beforeAll(async () => {
	await servicesInitializer({ dbConfig: global.testDBConfig });
});

afterAll(async () => {
	await db.destroy();
});

beforeEach(async () => {
	await global.knex.migrate.rollback();
	await global.knex.migrate.latest();
	await seed(global.knex);
});

describe('signup flow', () => {
	test('creates user with correct parameters', async () => {
		const response = await superTest(app)
			.post('/auth/signup')
			.send({
				firstName: 'Test',
				lastName: 'One',
				email: 'test.one@email.com',
				password: '11111111111',
				passwordConfirmation: '11111111111',
			})
			.expect(HttpStatus.OK);
		expect(response.body.result.user).toEqual(
			expect.objectContaining({
				firstName: 'Test',
				lastName: 'One',
				email: 'test.one@email.com',
			})
		);
	});

	test('error due to existing email', async () => {
		const response = await superTest(app)
			.post('/auth/signup')
			.send({
				firstName: 'Test',
				lastName: 'two',
				email: 'duplicate@email.com',
				password: '11111111111',
				passwordConfirmation: '11111111111',
			})
			.expect(HttpStatus.CONFLICT);
		expect(response.body.error).toEqual(expect.objectContaining(EMAIL_USED));
	});
});
