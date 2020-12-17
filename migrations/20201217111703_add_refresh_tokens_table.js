exports.up = async function (knex) {
	await knex.raw(`
		CREATE TABLE "RefreshTokens" (
			"refreshTokenID" serial PRIMARY KEY,
			"token" VARCHAR (250) UNIQUE NOT NULL,
			"expiryDate" TIMESTAMPTZ NOT NULL,
			"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"userID" INTEGER NOT NULL
		);
	`);
	await knex.raw(`
		ALTER TABLE "RefreshTokens"
		ADD CONSTRAINT FK_Users_RefreshTokens FOREIGN KEY ("userID")
		REFERENCES "Users"("userID")
	`);
};

exports.down = async function (knex) {
	await knex.raw(`ALTER TABLE "RefreshTokens" DROP CONSTRAINT FK_Users_RefreshTokens`);
	await knex.raw(`DROP TABLE "RefreshTokens"`);
};
