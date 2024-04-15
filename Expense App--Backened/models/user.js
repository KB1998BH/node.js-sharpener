const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
   
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false // Assuming name is required
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false, // Assuming email is required
        unique: true // Enforcing uniqueness of email addresses
    },
    
    password: {
        type: Sequelize.STRING, // Use STRING for password hashes
        allowNull: false // Assuming password is required
    }
});

module.exports = User;