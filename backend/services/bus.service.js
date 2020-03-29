"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const DbMixin = require("../mixins/db.mixin");
const busModel = require("../models/bus.model");
const { Op, Sequelize } = require("sequelize");

module.exports = {

	name: "bus",

	mixins: [DbMixin(busModel)],

	actions: {

		busList: {

			async handler() {
				let to = await this.adapter.db.query("Select distinct `to` from bus", { type: Sequelize.QueryTypes.SELECT });
				let from = await this.adapter.db.query("Select distinct `from` from bus", { type: Sequelize.QueryTypes.SELECT });
				let toData = to.map((data) => data.to);
				let fromData = from.map((data) => data.from);
				let buses = { to: toData, from: fromData };
				return buses;
			}

		},

		searchBus: {

			params: {
				to: "string",
				from: "string",
				seats: "number"
			},

			async handler(ctx) {
				let listBus = await this.adapter.find({ query: { to: ctx.params.to, from: ctx.params.from, seats: { [Op.gte]: ctx.params.seats } } });
				return listBus.map(this.adapter.entityToObject);
			}

		},

		getBus: {

			params: {
				busId: "string"
			},

			async handler(ctx) {
				let bus = await this.adapter.findById(ctx.params.busId);
				if (bus) {
					return this.adapter.entityToObject(bus);
				} else {
					return null;
				}
			}

		},

		reduceSeats: {

			params: {
				busId: "string",
				seats: "number"
			},

			async handler(ctx) {
				let bus = await this.adapter.findById(ctx.params.busId);
				console.log(bus);
				try {
					let data = await this.adapter.updateById(ctx.params.busId, {
						$set: {
							seats: bus.seats - ctx.params.seats,
							updatedAt: new Date()
						}
					});
					return this.adapter.entityToObject(data);
				} catch (err) {
					throw new MoleculerClientError("Error while updating place data", 422, "VALIDATION_ERROR", {
						error: err
					});
				}
			}

		},

		insertBus: {

			params: {
				to: "string",
				from: "string",
				price: "number",
				seats: "number",
				arr: "string",
				dep: "string"
			},

			async handler(ctx) {
				let insertBus = await this.adapter.insert(ctx.params);
				return insertBus;
			}

		}
	}

};
