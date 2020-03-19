const { Sequelize, DataTypes } = require("sequelize");

const model = {
	name: "booking",
	define: {
		booking_id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		bus_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		booking_date: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false
		}
	},
	options: {
		tableName: "booking"
	}
};

module.exports = model;