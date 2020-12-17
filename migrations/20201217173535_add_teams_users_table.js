exports.up = async function (knex) {
	await knex.raw(`
		CREATE TABLE "TeamsUsers" (
			"teamID" INTEGER NOT NULL,
			"userID" INTEGER NOT NULL,
			"role" VARCHAR (100) NOT NULL,
      PRIMARY KEY("teamID", "userID")
		);
  `);

	await knex.raw(
		`ALTER TABLE "TeamsUsers" ADD CONSTRAINT FK_Users_TeamsUsers FOREIGN KEY ("userID") REFERENCES "Users"("userID")`
	);

	await knex.raw(
		`ALTER TABLE "TeamsUsers" ADD CONSTRAINT FK_Teams_TeamsUsers FOREIGN KEY ("teamID") REFERENCES "Teams"("teamID")`
	);
};

exports.down = async function (knex) {
	await knex.raw(`ALTER TABLE "TeamsUsers" DROP CONSTRAINT FK_Users_TeamsUsers`);
	await knex.raw(`ALTER TABLE "TeamsUsers" DROP CONSTRAINT FK_Teams_TeamsUsers`);
	await knex.raw(`DROP TABLE "TeamsUsers"`);
};
