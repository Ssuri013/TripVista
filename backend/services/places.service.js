"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const DbMixin = require("../mixins/db.mixin");
const placesModel = require("../models/places.model");
const { Op, QueryTypes } = require("sequelize");

module.exports = {

	name: "places",

	mixins: [DbMixin(placesModel)],

	actions: {

		searchPlace: {

			params: {
				search: "string"
			},

			async handler(ctx) {
				let places = await this.adapter.find({ query: { name: { [Op.like]: `%${ctx.params.search}%` } } });
				return (places.map(this.adapter.entityToObject));
			}

		},

		getAllPlaces: {

			async handler() {
				let places = await this.adapter.find({});
				return (places.map(this.adapter.entityToObject));
			}

		},

		getAllCategories: {

			async handler() {
				let categories = await this.adapter.db.query("select distinct category from places", { type: QueryTypes.SELECT });
				let categoryData = categories.map((category) => category.category);
				return categoryData;
			}

		},

		getPlaceById: {

			params: {
				id: "string"
			},

			async handler(ctx) {
				let place = await this.adapter.findById(ctx.params.id);
				if (place) {
					let placeData = this.adapter.entityToObject(place);
					try {
						let data = await this.adapter.updateById(ctx.params.id, {
							$set: {
								hits: placeData.hits+1,
								updatedAt: new Date()
							}
						});
						return this.adapter.entityToObject(data);
					} catch (err) {
						throw new MoleculerClientError("Error while updating place data", 422, "VALIDATION_ERROR", {
							error: err
						});
					}
				} else {
					return null;
				}
			}

		},

		getByCategory: {

			params: {
				category: "string"
			},

			async handler(ctx) {
				let places = await this.adapter.find({ query: { category: ctx.params.category } });
				return (places.map(this.adapter.entityToObject));
			}

		},

		topPlaces: {

			async handler() {
				let places = await this.adapter.find({
					limit: 10,
					sort: ["-hits"]
				});
				return (places.map(this.adapter.entityToObject));

			}

		},

		insertPlace: {

			params: {
				name: "string",
				category: "string",
				location: "string",
				description: "string",
				lat: "number",
				lon: "number",
				hits: "number",
				images: "string"
			},

			async handler(ctx) {
				let result = await this.adapter.insert(ctx.params);
				return result;
			}

		}

	}
};
