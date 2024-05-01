const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
   
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expenseamount: {
        type: Sequelize.INTEGER,
        //allowNull: false // Assuming name is required
    },
    description: {
        type: Sequelize.STRING,
        //allowNull: false, // Assuming email is required
    },
    
    category: {
        type: Sequelize.STRING, // Use STRING for password hashes
        //allowNull: false // Assuming password is required
    }
});

module.exports = Expense;