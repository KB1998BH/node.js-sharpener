const Sequelize = require('sequelize');
const sequelize = new Sequelize('node', 'root', 'Krish@1998', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3308
});

module.exports = sequelize;