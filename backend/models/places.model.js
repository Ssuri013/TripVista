const { Sequelize, DataTypes } = require("sequelize");

const model = {
	name: "places",
	define: {
		place_id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false
		},
		decription: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lat: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		lon: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		hits: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		images: {
			type: DataTypes.STRING,
			allowNull: false
		},
	},
	options: {
		tableName: "places"
	}
};

module.exports = model;