import HttpStatus from 'http-status-codes';
import superTest from 'supertest';

import app from '@src/app';
import { seed } from '@tests/seeds/signup';
import { seed as teamSeed } from '@tests/seeds/teams';
import { ACCESS_UNAUTHORIZED } from '@src/helpers/errors';
import { generateToken } from '@auth/controllers';
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
	await teamSeed(global.knex);
});

describe('team management', () => {
	test('creates a team', async () => {
		const token = generateToken({ payload: { userID: 1 } });

		const response = await superTest(app)
			.post('/teams')
			.set('Authorization', `bearer ${token}`)
			.send({ name: 'Task force X' })
			.expect(HttpStatus.OK);

		expect(response.body.result).toEqual(expect.objectContaining({ name: 'Task force X' }));
	});

	test('add a new user as member from manager', async () => {
		const token = generateToken({ payload: { userID: 1 } });
		const response = await superTest(app)
			.post('/teams/1/add-user')
			.set('Authorization', `bearer ${token}`)
			.send({ userID: 2, role: 'member' })
			.expect(HttpStatus.OK);
		expect(response.body).toStrictEqual({ result: 'success' });
	});

	test('add a new user from member account', async () => {
		const token = generateToken({ payload: { userID: 1 } });
		const response = await superTest(app)
			.post('/teams/2/add-user')
			.set('Authorization', `bearer ${token}`)
			.send({ userID: 2, role: 'member' })
			.expect(HttpStatus.UNAUTHORIZED);
		expect(response.body.error).toEqual(expect.objectContaining(ACCESS_UNAUTHORIZED));
	});

	test('remove existing member from manager account', async () => {
		const token = generateToken({ payload: { userID: 3 } });
		const response = await superTest(app)
			.post('/teams/2/remove-user')
			.set('Authorization', `bearer ${token}`)
			.send({ userID: 2 });
		expect(response.body).toStrictEqual({ result: 'success' });
	});

	test('promote member to manager', async () => {
		const token = generateToken({ payload: { userID: 3 } });
		const response = await superTest(app)
			.patch('/teams/2/change-role')
			.set('Authorization', `bearer ${token}`)
			.send({ userID: 2, role: 'manager' });
		expect(response.body).toStrictEqual({ result: 'success' });
	});

	test('remove team', async () => {
		const token = generateToken({ payload: { userID: 3 } });
		const response = await superTest(app)
			.delete('/teams/2')
			.set('Authorization', `bearer ${token}`);
		expect(response.body).toStrictEqual({ result: 'success' });
	});
});
