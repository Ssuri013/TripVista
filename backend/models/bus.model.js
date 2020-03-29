const { Sequelize, DataTypes } = require("sequelize");

const model = {
	name: "bus",
	define: {
		b_id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		to: {
			type: DataTypes.STRING,
			allowNull: false
		},
		from: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		seats: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		arr: {
			type: DataTypes.STRING,
			allowNull: false
		},
		dep: {
			type: DataTypes.STRING,
			allowNull: false
		},
	},
	options: {
		tableName: "bus",
		timestamps: false,
	}
};

module.exports = model;
