const Sequelize = require('sequelize');
const sequelize = new Sequelize('expense-app', 'root', 'Krish@1998', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3308'
});

module.exports = sequelize;