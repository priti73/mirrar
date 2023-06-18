const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Variant = sequelize.define(
  'Variant',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sku: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    additionalCost: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    stockCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);


module.exports = Variant;
