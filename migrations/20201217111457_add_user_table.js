exports.up = async function (knex) {
	await knex.raw(`
		CREATE TABLE "Users" (
			"userID" serial PRIMARY KEY,
			"firstName" VARCHAR (500),
			"lastName" VARCHAR (500),
			"email" VARCHAR (500) UNIQUE NOT NULL,
			"password" VARCHAR (500),
			"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"resetPasswordHash" VARCHAR (500),
			"resetPasswordHashExpiry" TIMESTAMPTZ,
			"lastLoggedAt" TIMESTAMPTZ
		);
	`);
};

exports.down = async function (knex) {
	await knex.raw(`DROP TABLE "Users"`);
};
