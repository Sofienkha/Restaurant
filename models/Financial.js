const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Financial = sequelize.define('Financial', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  transactionId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id'
    }
  },
  serviceFee: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Financial;