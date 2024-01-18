const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    category: {
        type: Sequelize.STRING,
        //unique: true,
    },
    amount: {
        type: Sequelize.INTEGER,
        //unique: true,
    }
});

module.exports = User;