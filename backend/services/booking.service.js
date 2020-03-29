"use strict";

const DbMixin = require("../mixins/db.mixin");
const { MoleculerClientError } = require("moleculer").Errors;
const bookingModel = require("../models/booking.model");

module.exports = {

	name: "booking",

	mixins: [DbMixin(bookingModel)],

	actions: {

		bookTicket: {

			auth: "required",

			params: {
				busId: "string",
				price: "number",
				cardNumber: "string",
				seats: "number"
			},

			async handler(ctx) {
				let bookingDate = new Date().toLocaleString();
				if (this.validateCard(ctx.params.cardNumber)) {
					let bus = await ctx.call("bus.getBus", { busId: ctx.params.busId });
					if (bus) {
						let busPrice = bus.price;
						let totalPrice = busPrice * ctx.params.seats;
						if ((totalPrice == ctx.params.price) && (bus.seats > ctx.params.seats)) {
							let bookingModel = {
								user_id: ctx.meta.userId,
								bus_id: ctx.params.busId,
								booking_date: bookingDate,
								price: ctx.params.price,
								seats: ctx.params.seats
							};
							try {
								await ctx.call("bus.reduceSeats",{busId: ctx.params.busId,seats:ctx.params.seats});
								let result = await this.adapter.insert(bookingModel);
								return result;
							} catch (err) {
								throw new MoleculerClientError("Error while inserting in database", 500, "INTERNAL_ERROR", {
									error: "Error while inserting in database"
								});
							}
						} else {
							throw new MoleculerClientError("Invalid Price", 422, "VALIDATION_ERROR", {
								error: "Invalid Price"
							});
						}
					} else {
						throw new MoleculerClientError("Invalid BusID", 422, "VALIDATION_ERROR", {
							error: "Invalid BusID"
						});
					}
				} else {
					throw new MoleculerClientError("Invalid Card Number", 422, "VALIDATION_ERROR", {
						error: "Invalid Card Number"
					});
				}
			}

		},

		ticketHistory: {
			auth: "required",
			async handler(ctx) {
				let result = await this.adapter.find({ user_id: ctx.meta.userId });
				return (result.map(this.adapter.entityToObject));
			}
		}

	},

	methods: {

		validateCard(cardNumber) {
			return cardNumber === "1111-1111-1111-1111";
		}

	}

};
