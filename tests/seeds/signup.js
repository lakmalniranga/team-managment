export async function seed(knex) {
	await knex('Users').insert([
		{
			firstName: 'Test',
			lastName: 'One',
			email: 'duplicate@email.com',
			password: 'password',
		},
		{
			firstName: 'Test',
			lastName: 'Two',
			email: 'test.two@email.com',
			password: 'password',
		},
		{
			firstName: 'Test',
			lastName: 'Three',
			email: 'test.three@email.com',
			password: 'password',
		},
	]);
}
