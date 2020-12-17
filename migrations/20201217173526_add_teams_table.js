exports.up = async function (knex) {
	await knex.raw(`
		CREATE TABLE "Teams" (
			"teamID" serial PRIMARY KEY,
			"name" VARCHAR (250) NOT NULL,
			"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);
  `);
};

exports.down = async function (knex) {
	await knex.raw(`DROP TABLE "Teams"`);
};
