"use strict";

const DbMixin = require("../mixins/db.mixin");
const busModel = require("../models/bus.model");
const Sequelize = require("sequelize");

/**
 * bus service
 */
module.exports = {

	name: "bus",
	mixins: [DbMixin(busModel)],

	/**
	 * Service settings
	 */
	settings: {},

	/**
	 * Service metadata
	 */
	metadata: {},

	/**
	 * Service dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		* Test action
		*/
		busList: {
			async handler(ctx) {
				let to=await this.adapter.db.query("Select distinct `to` from bus",{ type: Sequelize.QueryTypes.SELECT });
				let from=await this.adapter.db.query("Select distinct `from` from bus",{ type: Sequelize.QueryTypes.SELECT });
				//let buses = Array.prototype.push.apply(to,from); 
				let buses=[to,from]
				//console.log(buses)
				return buses
			}
		},

		searchBus: {
			params: {
				to: "string",
				from: "string",
			},
			async handler(ctx) {
				//let listBus=await this.adapter.db.query("Select * from bus where `to`='"+ctx.params.to+"' and `from`='"+ctx.params.from+"'",{ type: Sequelize.QueryTypes.SELECT });
				//let listBus=await this.adapter.find({query:{to:ctx.params.to,from:ctx.params.from}})
				let listBus=await this.adapter.find({query:{to:ctx.params.to,from:ctx.params.from}})
				return listBus
			}
		}
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
