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
	settings: {},
	metadata: {},
	dependencies: [],
	actions: {

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

	events: {	
	},
	methods: {
	},
	created() {
	},
	async started() {
	},
	async stopped() {

	}
};
