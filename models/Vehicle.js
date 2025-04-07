const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  serviceProviderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'ServiceProviders',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING
  },
  pricePerHour: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Vehicle;