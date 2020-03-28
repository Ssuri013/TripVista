const { Sequelize, DataTypes } = require("sequelize");

const model = {
	name: "bus",
	define: {
		b_id: {
			type: DataTypes.UUID,
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
			type: DataTypes.UUID,
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
