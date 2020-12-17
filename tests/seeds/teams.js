export async function seed(knex) {
	await knex('Teams').insert([{ name: 'A Team' }, { name: 'B Team' }, { name: 'C Team' }]);

	// add a new user as member from manager
	await knex('TeamsUsers').insert([{ teamID: 1, userID: 1, role: 'manager' }]);

	// add a new user from member account
	await knex('TeamsUsers').insert([{ teamID: 2, userID: 1, role: 'member' }]);

	// remove existing member from manager account
	await knex('TeamsUsers').insert([
		{ teamID: 2, userID: 3, role: 'manager' },
		{ teamID: 2, userID: 2, role: 'member' },
	]);
}
