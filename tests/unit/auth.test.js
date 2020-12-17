import userBusiness from '@users/business';
import servicesInitializer from '@services';

jest.mock('@users/repositories', () => {
	const users = [];
	return {
		emailExists: () => false,
		create: ({ ...user }) => {
			users.push({ ...user, toJSON: () => user });
		},
		findByEmail: ({ email }) => users.find((u) => u.email === email),
	};
});

beforeAll(async () => {
	await servicesInitializer({});
});

describe('authentication and authorization', () => {
	test('creates a user', async () => {
		const user = {
			firstName: 'Jone',
			lastName: 'Doe',
			email: 'jone.doe@example.com',
			password: '111111111',
		};
		const result = await userBusiness.createBasic({ ...user });
		expect(result).toStrictEqual({ ...user, password: result.password });
	});
});
