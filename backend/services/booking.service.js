"use strict";

const DbMixin = require("../mixins/db.mixin");
const { MoleculerClientError } = require("moleculer").Errors;
const bookingModel = require("../models/booking.model");

module.exports = {
	name: "booking",

	mixins: [DbMixin(bookingModel)],

	settings: {

	},
	dependencies: [],

	actions: {

		bookTicket: {
			params: {
				userId: "string",
				busId: "string",
				bookingDate: "string",
				price: "number",
				cardNumber: "string"
			},
			async handler(ctx) {
				if (this.validateCard(ctx.params.cardNumber)) {
					let bookingModel = {
						user_id: ctx.params.userId,
						bus_id: ctx.params.busId,
						booking_date: ctx.params.bookingDate,
						price: ctx.params.price
					};
					let result = await this.adapter.insert(bookingModel);
					return result;
				} else {
					return new MoleculerClientError("Invalid Card Number", 422, "VALIDATION_ERROR", {
						error: "Invalid Card Number"
					});
				}
			}
		},

		ticketHistory: {
			params: {
				userId: "string"
			},
			async handler(ctx) {
				let result = await this.adapter.find({ user_id: ctx.params.userId });
				return result;
			}
		}
	},
	methods: {
		validateCard(cardNumber) {
			return cardNumber === "1111-1111-1111-1111";
		}
	}

};
