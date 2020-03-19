"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
require("dotenv").config();

module.exports = (model) => {
	let dbHost = process.env.DB_HOST;
	let dbUser = process.env.DB_USER;
	let dbPassword = process.env.DB_PASSWORD;
	let db = process.env.DB;
	let dbType = process.env.DB_TYPE;
	const schema = {
		mixins: [DbService],
		model: model,
		adapter: new SqlAdapter(db, dbUser, dbPassword, {
			host: dbHost,
			dialect: dbType,
			ssl: true,
			define: {
				freezeTableName: true
			}
		})
	};
	return schema;
};