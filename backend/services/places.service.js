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
				path: "/getplace"
			},
			params: {
				search: "string"
			},
			async handler(ctx) {//implement event
				const query = util.promisify(con.query).bind(con);
				ctx.emit("popularPlace", ctx.params.search);
				let x = await query("SELECT * FROM places where name='" + ctx.params.search + "'");
				return x;
			}
		},

		categories: {
			rest: {
				method: "GET",
				path: "/categories"
			},
			params: {
				cat: "string"
			},
			async handler(ctx) {
				const query = util.promisify(con.query).bind(con);
				let x = await query("SELECT * FROM places where category='" + ctx.params.cat + "'");
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
				let x = await query("SELECT * FROM places order by hits DESC limit 10");
				return x;
			}
		},

	},

	/**
	 * Events
	 */
	events: {
		"popularPlace"(place) {
			console.log("event triggered " + place.payload);
			con.query("update places set hits = hits + 1 where name='" + place + "';");	
		}
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

//database structure
// CREATE DATABASE TravelGuide;
// USE TravelGuide;
// create table places ( place_id INT, name varchar(45), category varchar(45), location varchar(45), description varchar(45), lat double, lon double);
// desc places;

// insert into places (place_id, name, category, location, description, lat, lon) values (1, "waterfront", "sea", "Halifax", "Beautiful view", 1.4, 12.44);
// insert into places (place_id, name, category, location, description, lat, lon) values (2, "something else", "sea", "Halifax", "Beautiful view", 1.4, 12.44);
// insert into places (place_id, name, category, location, description, lat, lon) values (3, "aur kuch nahi hai yaha", "others", "Halifax", "Beautiful view", 1.4, 12.44);
// ALTER TABLE places ADD hits INT NOT NULL DEFAULT 0;

// select * from places;
// select * from places where name='waterfront';
// select * from places where category='sea';
// SELECT * FROM places order by hits DESC limit 1