const { Sequelize, DataTypes } = require("sequelize");

const model = {
	name: "user",
	define: {
		id:{
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		token: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	options: {
		tableName: "user"
	}
};

module.exports = model;