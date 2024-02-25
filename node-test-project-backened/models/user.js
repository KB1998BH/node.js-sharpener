const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = sequelize.define('user', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    itemname: Sequelize.STRING,
    
    description:  Sequelize.STRING,
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
    

    
});

module.exports = User;