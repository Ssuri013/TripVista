"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,

		ip: "0.0.0.0",

		use: [],
		cors: {
			origin: "**",
			methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
			allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers", "X-Requested-With", "Origin"],
			exposedHeaders: [],
			credentials: false,
			maxAge: 3600
		},
		routes: [
			{
				path: "/api",

				cors: true,

				whitelist: [
					"**"
				],
				use: [],
				
				authentication: true,

				authorization: false,

				autoAliases: false,

				aliases: {
					"POST user/register": "user.register",
					"POST user/login": "user.login",
					"POST user/verify": "user.verifyCode",
					"GET places": "places.getAllPlaces",
					"POST places/search": "places.searchPlace",
					"GET places/categories": "places.getAllCategories",
					"GET places/:id":"places.getPlaceById",
					"GET places/category/:category": "places.getByCategory",
					"GET places/top10": "places.topPlaces",
					"GET bus/list": "bus.busList",
					"POST bus/search": "bus.searchBus",
					"POST booking/book": "booking.bookTicket",
					"GET booking/history": "booking.ticketHistory"
				},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				logging: true
			}
		],

		log4XXResponses: false,
		logRequestParams: null,
		logResponseData: null,

		assets: {
			folder: "public",

			options: {}
		}
	},

	methods: {

		async authenticate(ctx, route, req) {
			const auth = req.headers["authorization"];
			console.log("Before");
			if (req.$action.auth == "required" && auth && auth.startsWith("Bearer")) {
				const token = auth.slice(7);
				console.log("Here");
				if (token) {
					try {
						let decoded = await ctx.call("user.resolveToken", { token });
						ctx.meta.userId = decoded.id;
						return Promise.resolve();
					} catch (err) {
						return Promise.reject(err);
					}
				} else {
					return Promise.reject();
				}

			} else {
				if(req.$action.auth != "required"){
					return Promise.resolve(null);
				}else{
					return Promise.reject("Unauthorized");
				}
			}
		}

	}
};
