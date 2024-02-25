const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-test-project1', 'root', 'Krish@1998', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3308'
});

module.exports = sequelize;