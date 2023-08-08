const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Data = sequelize.define('Data', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Data;
