"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DbMixin = require("../mixins/db.mixin");
const MailService = require("moleculer-mail");
const CryptoJS = require("crypto-js");

module.exports = {

	name: "user",

	mixins: [
		DbMixin(userModel),
		MailService
	],

	settings: {

		from: "tripvista001@gmail.com",
		transport: {
			service: "gmail",
			auth: {
				user: "tripvista001@gmail.com",
				pass: "tripvista@123"
			}
		},
		JWT_SECRET: process.env.JWT_SECRET || "jwt-conduit-secret"

	},
	actions: {

		register: {

			params: {
				email: "string",
				password: "string",
				username: "string"
			},

			async handler(ctx) {
				let username = ctx.params.username;
				let password = bcrypt.hashSync(ctx.params.password, 10);
				let email = ctx.params.email;

				if (!this.validateEmail(email)) {
					throw new MoleculerClientError("Invalid Email", 422, "VALIDATION_ERROR", {
						error: "Please provide a proper email"
					});
				}

				if (!this.validatePassword(ctx.params.password)) {
					throw new MoleculerClientError("Invalid Password", 422, "VALIDATION_ERROR", {
						error: "Please provide a proper password"
					});
				}

				if (!this.validateUsername(username)) {
					throw new MoleculerClientError("Invalid Username", 422, "VALIDATION_ERROR", {
						error: "Please provide a proper username"
					});
				}

				let user = await this.adapter.findOne({ where: { email } });
				if (user) {
					throw new MoleculerClientError("Invalid Email", 422, "VALIDATION_ERROR", {
						error: "Email already exists"
					});
				}

				let verificationToken = this.generateVerificatonToken();

				let result = await ctx.call("user.send", {
					to: email,
					subject: "Trip Vista Account Verification",
					html: `<b>Hello ${username},</b><h1>Your verification code : ${verificationToken}</h1> 
                    Please enter the code on Trip Vista to get verified. Thanks!`,
				});

				if (!result.accepted) {
					throw new MoleculerClientError("Invalid Email", 422, "VALIDATION_ERROR", {
						error: "Sorry could not send email to your Email ID"
					});
				}

				let userModel = {
					username: username,
					email: email,
					password: password,
					verified: false,
					token: verificationToken
				};
				try {
					let userResult = await this.adapter.insert(userModel);
					return {
						id: userResult.id
					};
				} catch (err) {
					throw new MoleculerClientError("Error while inserting in database", 500, "INTERNAL_ERROR", {
						error: "Error while inserting in database"
					});
				}
			}

		},

		login: {

			params: {
				email: "string",
				password: "string"
			},

			async handler(ctx) {
				const email = ctx.params.email;
				const password = this.decryptData(ctx.params.password);
				const user = await this.adapter.findOne({ where: { email } });
				if (!user)
					throw new MoleculerClientError("Email or password is invalid!", 422, "", [{ message: "Email or password is invalid!" }]);

				if (!user.verified)
					throw new MoleculerClientError("User not verified", 422, "", [{ message: "Email or password is invalid!" }]);

				const res = await bcrypt.compare(password, user.password);
				if (!res)
					throw new MoleculerClientError("Email or password is invalid!", 422, "", [{ message: "Email or password is invalid!" }]);

				let token = this.generateJWT(user);
				return {
					token,
					id: user.id
				};
			}

		},

		verifyCode: {

			params: {
				id: "string",
				code: "number"
			},

			async handler(ctx) {
				const id = ctx.params.id;
				let user = await this.adapter.findById(id);
				if (user) {
					let verifcationCode = user.token;
					if (!user.verified) {
						if (ctx.params.code == verifcationCode) {
							try {
								let result = await this.adapter.updateById(id, {
									"$set": {
										verified: 1,
										updatedAt: new Date()
									}
								});
								console.log(this.adapter.entityToObject(result));
								return {
									verified: true
								};
							} catch (err) {
								throw new MoleculerClientError("Error while updating in database", 500, "INTERNAL_ERROR", {
									error: "Error while updating in database"
								});
							}
						} else {
							return {
								verified: false
							};
						}
					} else {
						throw new MoleculerClientError("User is also validated", 422, "VALIDATION_ERROR", {
							error: "User is already validated"
						});
					}
				} else {
					throw new MoleculerClientError("Invalid User Id", 422, "VALIDATION_ERROR", {
						error: "No user related to this ID"
					});
				}
			}

		},
		resolveToken: {

			params: {
				token: "string"
			},

			async handler(ctx) {
				try {
					let decoded = jwt.verify(ctx.params.token, this.settings.JWT_SECRET);
					return Promise.resolve(decoded);
				} catch (err) {
					return Promise.reject(err);
				}
			}

		}

	},

	methods: {
		
		generateJWT(user) {
			const today = new Date();
			const exp = new Date(today);
			exp.setDate(today.getDate() + 1);

			return jwt.sign({
				id: user.id,
				username: user.username,
				exp: Math.floor(exp.getTime() / 1000)
			}, this.settings.JWT_SECRET);
		},

		generateVerificatonToken() {
			return Math.floor(Math.random() * 10000);
		},

		validateEmail(email) {
			let regularExpression = /\S+@\S+\.\S+/;
			return regularExpression.test(email);
		},

		validatePassword(password) {
			if (password.length >= 8) {
				return true;
			} else {
				return false;
			}
		},

		validateUsername(username) {
			if (username.length >= 4) {
				return true;
			} else {
				return false;
			}
		},

		decryptData(text) {
			let shift = -2;
			let result = "";
			for (let i = 0; i < text.length; i++) {
				let c = text.charCodeAt(i);
				result += String.fromCharCode(c + shift);         
			}
			return result;
		}
	}
};
