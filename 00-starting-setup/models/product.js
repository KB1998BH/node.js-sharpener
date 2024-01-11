
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type:Sequelize.INTEGER,
    autoIncrement: true,
    alloNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    alloNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    alloNull: false
  },
  description: {
    type: Sequelize.STRING,
    alloNull: false
  }
});

module.exports = Product;
