"use strict";

let mysql = require("mysql");
const util = require("util");

//let con = mysql.createConnection({
	//host: "raasta-batao.crpu0wgb5jau.us-east-1.rds.amazonaws.com",
	//user: "admin",
	//password: "",
	//database: "TravelGuide"
//});

/**con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});
const DbMixin = require("../mixins/db.mixin");
const placesModel = require("../models/places.model");
// const sequelize = require("sequelize");


/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "places",

	mixins: [DbMixin(placesModel)],

	settings: {},

	dependencies: [],

	actions: {

		search: {
			rest: {
				method: "GET",
				path: "/getplace"
			},
			params: {
				search: "string"
			},
			async handler(ctx) {
				let places = await this.adapter.find({query:{name:ctx.params.search}});
				ctx.emit("popularPlace", ctx.params.search);
				return places;
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
				let result = await this.adapter.find({query:{category:ctx.params.cat}});
				return result;
			}
		},

		topplaces: {
			rest: {
				method: "GET",
				path: "/topplaces"
			},
			async handler() {
				let places = await this.adapter.find({ 
					limit: 10 ,
					order: 'hits DESC'
				});
				return places;
				
			}
		},

	},

	/**
	 * Events
	 */
	events: {
		"popularPlace"(place) {
			console.log("event triggered " + place);
			// let places = this.adapter.update(
			// 	{hits: this.Sequalize.literal('hits + 1')},
			// 	{where: {name: place}}
			//   );
			// let p = this.adapter.update({ hits: sequelize.literal('hits + 1') }, { where: { name: place } });
			//   this.adapter.sync()
			//   .then(() => this.apater.find({ name: places }))
			//   .then(() => this.adapter.update({ hits: Sequelize.literal('field + 1') }, { where: { id: 1 }}))
			//   .then(console.log);
			// let p = this.adapter._update("update places set hits = hits + 1 where name='" + place + "';");
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


// insert into placesInt (place_id, name, category, location, decription, lat, lon, hits, images, createdAt, updatedAt) values (1, "waterfront", "sea", "Halifax", "Beautiful view", 1.4, 12.44, 0, "images", NOW(), NOW());
