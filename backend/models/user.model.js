const { Sequelize, DataTypes } = require("sequelize");

const model = {
	name: "user",
	define: {
        name: {
			type: DataTypes.STRING,
			allowNull: false
        },
		password: {
			type: DataTypes.STRING,
			allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
		},
		token:{
			type: DataTypes.INTEGER,
			allowNull: false

		}
	},
	options: {
		tableName: "user"
	}
};

module.exports = model;