import teamBusiness from '@teams/business';
import servicesInitializer from '@services';

beforeAll(async () => {
	await servicesInitializer({});
});

jest.mock('@teams/repositories', () => {
	const teams = [];
	return {
		create: ({ ...team }) => {
			teams.push({ ...team, toJSON: () => team });
		},
		findByID: ({ teamID }) => teams.find((u) => u.teamID === teamID),
	};
});

describe('team creation', () => {
	test('authorized user can create a team', async () => {
		const team = { name: 'Avengers' };
		const result = await teamBusiness.create({ ...team });
		expect(result.name).toEqual(team.name);
	});
});
