"use strict";
let mysql = require("mysql");
const util = require("util");

let con = mysql.createConnection({
	host: "raasta-batao.crpu0wgb5jau.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "",
	database: "TravelGuide"
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "places",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		search: {
			rest: {
				method: "GET",
				path: "/hey"
			},
			async handler() {
				const query = util.promisify(con.query).bind(con);
				let x = await query("SELECT * FROM places");
				return x;
			}
		},

		categories: {
			rest: {
				method: "GET",
				path: "/categories"
			},
			async handler() {
				const query = util.promisify(con.query).bind(con);
				let x = await query("SELECT * FROM places");
				return x;
			}
		},

		topPlaces: {
			rest: {
				method: "GET",
				path: "/topplaces"
			},
			async handler() {
				const query = util.promisify(con.query).bind(con);
				let x = await query("SELECT * FROM places");
				return x;
			}
		},

	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
