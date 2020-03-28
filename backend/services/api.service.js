"use strict";

const ApiGateway = require("moleculer-web");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * @typedef {import('http').IncomingMessage} IncomingRequest Incoming HTTP Request
 * @typedef {import('http').ServerResponse} ServerResponse HTTP Server Response
 */

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
				mergeParams: true,

				// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
				authentication: false,

				authorization: false,

				autoAliases: false,

				aliases: {
					"GET bus": "bus.busList",
					"GET searchBus": "bus.searchBus",
					"POST booking/book": "booking.bookTicket",
					"GET booking/history": "booking.ticketHistory",
					"POST users": "user.create",
					"POST users/login": "user.login",
					"POST mailer": "mail.send",	
					"POST users/verify": "user.verify",	
					"GET booking/history": "booking.ticketHistory"
				},
				callingOptions: {},

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

				mappingPolicy: "all",

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

		/**
		 * Authenticate the request. It check the `Authorization` token value in the request header.
		 * Check the token value & resolve the user by the token.
		 * The resolved user will be available in `ctx.meta.user`
		 *
		 * PLEASE NOTE, IT'S JUST AN EXAMPLE IMPLEMENTATION. DO NOT USE IN PRODUCTION!
		 *
		 * @param {Context} ctx
		 * @param {Object} route
		 * @param {IncomingRequest} req
		 * @returns {Promise}
		 */
		async authenticate(ctx, route, req) {
			const auth = req.headers["authorization"];

			if (auth && auth.startsWith("Bearer")) {
				const token = auth.slice(7);

				if (token == "123456") {
					return { id: 1, name: "John Doe" };

				} else {
					throw new ApiGateway.Errors.UnAuthorizedError(ApiGateway.Errors.ERR_INVALID_TOKEN);
				}

			} else {
				return null;
			}
		},

		/**
		 * Authorize the request. Check that the authenticated user has right to access the resource.
		 *
		 * PLEASE NOTE, IT'S JUST AN EXAMPLE IMPLEMENTATION. DO NOT USE IN PRODUCTION!
		 *
		 * @param {Context} ctx
		 * @param {Object} route
		 * @param {IncomingRequest} req
		 * @returns {Promise}
		 */
		async authorize(ctx, route, req) {
			const user = ctx.meta.user;

			if (req.$action.auth == "required" && !user) {
				throw new ApiGateway.Errors.UnAuthorizedError("NO_RIGHTS");
			}
		}

	}
};
